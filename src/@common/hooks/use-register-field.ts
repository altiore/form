import {useEffect, useMemo} from 'react';

import {ArrayFieldState, FieldMeta, FormContextState} from '~/@common/types';

type ResType = {
	isInsideForm: boolean;
	name: string;
	field?: FieldMeta;
};

export const useRegisterField = (
	arrayFieldState: ArrayFieldState,
	formState: FormContextState,
	providedName: string,
	isArray = false,
): ResType => {
	const fieldName = useMemo(() => {
		return arrayFieldState?.name &&
			!providedName.match(new RegExp('^' + String(arrayFieldState.name)))
			? `${arrayFieldState.name}.${providedName}`
			: providedName;
	}, [arrayFieldState?.name, providedName]);

	const registerField = useMemo(
		() => formState?.registerField,
		[formState?.registerField],
	);

	const isInsideForm = useMemo(() => Boolean(registerField), [registerField]);

	useEffect(() => {
		if (isInsideForm) {
			return registerField(fieldName, isArray);
		}
	}, [fieldName, isArray, isInsideForm, registerField]);

	const fields = useMemo(() => formState?.fields, [formState?.fields]);

	const field = useMemo(() => fields?.[fieldName], [fields, fieldName]);

	return {field, isInsideForm, name: fieldName};
};
