import get from 'lodash/get';
import set from 'lodash/set';

import {FieldMeta} from '~/@common/types';
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

	formData.forEach((value: unknown, name: string) => {
		// Мы не можем проверить ошибки валидации внутри этого цикла, т.к. данные еще не
		// полностью сформированы (особенно для массивов)
		const fieldType = fields[name]?.fieldType;
		// находим функцию для преобразования данных к правильному формату,
		// если такая есть
		const prepareValue = parseValueByType.get(fieldType);

		const prevValue = get(values, name);
		if (prevValue) {
			// если предыдущее значение существует, значит это массив
			const newValue = Array.isArray(prevValue)
				? [...prevValue, value]
				: [prevValue, value];

			// если функция преобразования данных к правильному формату есть -
			// применяем ее
			set(values, name, prepareValue ? prepareValue(newValue) : newValue);
		} else {
			// если функция преобразования данных к правильному формату есть -
			// применяем ее
			set(values, name, prepareValue ? prepareValue(value) : value);
		}
	});

	return values;
};
