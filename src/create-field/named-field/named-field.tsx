import React from 'react';

import {useRegisterField} from '~/@common/hooks/use-register-field';
import {NamedFieldProps} from '~/@common/types';

import ValidatedField, {ValidatedFieldProps} from './validated-field';

export const NamedField = <T, Input extends HTMLElement = HTMLInputElement>({
	fieldArrayState,
	formState,
	providedName,
	type,
	...rest
}: NamedFieldProps<
	ValidatedFieldProps<T, Input>,
	'field' | 'name'
>): JSX.Element => {
	const {field, isInsideForm, name} = useRegisterField(
		fieldArrayState,
		formState,
		providedName,
		type,
	);

	if (isInsideForm && !field) {
		return null;
	}

	return (
		<ValidatedField
			{...rest}
			formRef={formState?.formRef}
			field={field}
			name={name}
			type={type}
		/>
	);
};
