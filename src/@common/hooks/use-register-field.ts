import {useEffect, useMemo, useState} from 'react';

import {
	FieldArrayState,
	FieldMeta,
	FieldType,
	FormContextState,
	ValidateFunc,
} from '~/@common/types';

type ResType = {
	isInsideForm: boolean;
	isRegistered: boolean;
	name: string;
	field?: FieldMeta;
	validators: Array<ValidateFunc>;
};

export const useRegisterField = <
	FormState extends Record<string, any> = Record<string, any>,
>(
	fieldArrayState: FieldArrayState,
	formState: FormContextState,
	providedName: keyof FormState,
	validate: ValidateFunc | Array<ValidateFunc>,
	fieldType?: FieldType,
	isArray?: boolean,
	defaultValue?: unknown,
): ResType => {
	// TODO: Мы делаем валидаторы нереагирующими на изменение валидаторов, т.к.:
	//  1. неясно как сохранить массив валидаторов так, чтоб он не изменялся при перерендере родителя
	//  2. неясно, что делать, если массив валидаторов все-таки изменится
	const validators = useMemo<Array<ValidateFunc>>(
		() => (typeof validate === 'function' ? [validate] : validate),
		[],
	);

	// Имя поля ввода, которое будет использоваться под капотом, чтоб создать правильную иерархию
	// свойств
	const fieldName = useMemo(() => {
		return fieldArrayState?.name &&
			!(providedName as string).match(
				new RegExp('^' + String(fieldArrayState.name)),
			)
			? `${fieldArrayState.name}.${providedName}`
			: (providedName as string);
	}, [fieldArrayState?.name, providedName]);

	const registerField = useMemo(
		() => formState?.registerField,
		[formState?.registerField],
	);

	const isInsideForm = useMemo(() => Boolean(registerField), [registerField]);

	const [isRegistered, setIsRegistered] = useState(false);
	useEffect(() => {
		if (isInsideForm) {
			const unmountFunc = registerField(
				fieldName,
				fieldType ?? (isArray ? FieldType.ARRAY : FieldType.TEXT),
				defaultValue,
				validators,
			);
			setIsRegistered(true);
			// Возвращаемое значение здесь удаляет поле из памяти FormContextState['fields']
			return unmountFunc;
		} else {
			if (fieldType) {
				console.warn(
					`Указанный fieldType=${fieldType} будет проигнорирован вне контекста формы. Разместите` +
						` ваше поле ввода ${fieldName} внутри компонента формы, чтоб это заработало`,
				);
			}

			setIsRegistered(true);
		}
	}, [
		defaultValue,
		fieldName,
		fieldType,
		isArray,
		isInsideForm,
		registerField,
		setIsRegistered,
		validators,
	]);

	const fields = useMemo(() => formState?.fields, [formState?.fields]);

	const field = useMemo(() => fields?.[fieldName], [fields, fieldName]);

	return {field, isInsideForm, isRegistered, name: fieldName, validators};
};
