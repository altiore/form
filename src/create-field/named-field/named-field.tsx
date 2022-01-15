import React from 'react';

import {useRegisterField} from '~/@common/hooks/use-register-field';
import {NamedFieldProps} from '~/@common/types';

import ValidatedField, {ValidatedFieldProps} from './validated-field';

export const NamedField = <
	T extends {defaultValue?: any},
	Input extends HTMLElement = HTMLInputElement,
>({
	fieldArrayState,
	formState,
	providedName,
	type,
	componentProps,
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
		false,
		componentProps.defaultValue,
		Boolean(rest.validators?.length),
	);

	if (isInsideForm && !field) {
		return null;
	}

	return (
		<ValidatedField
			{...rest}
			componentProps={componentProps}
			formRef={formState?.formRef}
			field={field}
			name={name}
			type={type}
		/>
	);
};
