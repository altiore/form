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
};

export const useRegisterField = (
	fieldArrayState: FieldArrayState,
	formState: FormContextState,
	providedName: string,
	validators: Array<ValidateFunc>,
	fieldType?: FieldType,
	isArray?: boolean,
	defaultValue?: unknown,
): ResType => {
	const fieldName = useMemo(() => {
		return fieldArrayState?.name &&
			!providedName.match(new RegExp('^' + String(fieldArrayState.name)))
			? `${fieldArrayState.name}.${providedName}`
			: providedName;
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
			return unmountFunc;
		} else {
			if (fieldType) {
				console.warn(
					`Указанный fieldType=${fieldType} будет проигнорирован вне контекста формы. Разместите` +
						` ваш инпут ${fieldName} внутри компонента формы, чтоб это заработало`,
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

	return {field, isInsideForm, isRegistered, name: fieldName};
};
