import get from 'lodash/get';
import set from 'lodash/set';

import {FieldMeta, FieldType} from '~/@common/types';
import {parseValueByType} from '~/@common/utils';

export const getArrayValue = (
	fieldName: string,
	values: Record<string, any>,
	items: number[],
): any[] => {
	return items.map((index: number) => {
		return (get(values, fieldName) as any[])[index];
	});
};

export const toFlatErrors = (
	errors: Record<string, any>,
	setErrors: (fieldName: string, errors: string[]) => void,
	prefix = '',
): void => {
	Object.entries(errors).forEach(([namePart, errorField]) => {
		const name = (prefix ? `${prefix}.` : '') + namePart;
		if (
			(Array.isArray(errorField) && typeof errorField[0] === 'string') ||
			typeof errorField === 'string'
		) {
			setErrors(
				name,
				typeof errorField === 'string' ? [errorField] : errorField,
			);
		} else {
			toFlatErrors(errorField, setErrors, name);
		}
	});
};

export const getFormValues = (
	formRefCurrent: HTMLFormElement | undefined,
	fields: Record<string, FieldMeta>,
): any => {
	const formData = new window.FormData(formRefCurrent ?? undefined);
	const values: Record<string, unknown> = {};

	const formDataMap = new Map(Array.from(formData as any));

	const fieldKeys = Object.keys(fields);
	fieldKeys.forEach((name) => {
		let value = formDataMap.has(name) ? formDataMap.get(name) : undefined;

		// Мы не можем проверить ошибки валидации внутри этого цикла, т.к. данные еще не
		// полностью сформированы (особенно для массивов)
		const fieldType = fields[name]?.fieldType;

		// TODO: возможно, не нужно пропускать это значение
		// пропускаем массив, т.к. если мы найдем это значение позже вложенных в массив элементов,
		// то они могут затереться
		if (fieldType === FieldType.ARRAY) {
			return;
		}

		if (fieldType === FieldType.SELECT_MULTIPLE) {
			if (!Array.isArray(value)) {
				value = Array.from(
					document.querySelector<HTMLSelectElement>(`select[name='${name}']`)
						?.options || [],
				)
					.filter((el) => el.selected)
					.map((el) => el.value);
			}
		}

		// TODO: возможно, этот код больше не актуален и полностью покрывается кодом выше про SELECT_MULTIPLE
		const prevValue = get(values, name);
		if (prevValue) {
			// если предыдущее значение существует, значит это массив
			value = Array.isArray(prevValue)
				? [...prevValue, value]
				: [prevValue, value];
		}

		// если функция преобразования данных к правильному формату есть -
		// применяем ее
		const prepareValue = parseValueByType.get(fieldType);
		set(values, name, prepareValue ? prepareValue(value) : value);
	});

	// установить данные из полей, которые не были зарегистрированы в библиотеке, но есть в форме
	// (только с непустым полем name)
	Array.from(formDataMap.keys())
		.filter((key: string) => !fieldKeys.includes(key))
		.forEach((name: string) => {
			if (name) {
				set(values, name, formDataMap.get(name));
			}
		});

	return values;
};
