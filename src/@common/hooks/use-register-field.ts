import {useEffect, useMemo} from 'react';

import {
	FieldArrayState,
	FieldMeta,
	FieldType,
	FormContextState,
} from '~/@common/types';

type ResType = {
	isInsideForm: boolean;
	name: string;
	field?: FieldMeta;
};

export const useRegisterField = (
	fieldArrayState: FieldArrayState,
	formState: FormContextState,
	providedName: string,
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

	useEffect(() => {
		if (isInsideForm) {
			return registerField(
				fieldName,
				fieldType ?? (isArray ? FieldType.ARRAY : undefined),
				defaultValue,
			);
		} else {
			if (fieldType) {
				console.warn(
					'Указанный fieldType будет проигнорирован вне контекста формы. Разместите' +
						' ваш инпут внутри компонента формы, чтоб это заработало',
				);
			}
		}
	}, [
		defaultValue,
		fieldName,
		fieldType,
		isArray,
		isInsideForm,
		registerField,
	]);

	const fields = useMemo(() => formState?.fields, [formState?.fields]);

	const field = useMemo(() => fields?.[fieldName], [fields, fieldName]);

	return {field, isInsideForm, name: fieldName};
};
