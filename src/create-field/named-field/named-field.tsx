import React from 'react';

import {useRegisterField} from '~/@common/hooks/use-register-field';
import {
	FieldOptions,
	FieldOuterProps,
	FieldProps,
	NamedFieldProps,
} from '~/@common/types';

import ValidatedField from './validated-field';

type Props<
	FieldCustomProps extends Record<string, any>,
	Input extends HTMLElement = HTMLInputElement,
	FormState extends Record<string, any> = Record<string, any>,
> = NamedFieldProps &
	FieldOuterProps<FormState> &
	FieldOptions & {
		component: (
			props: FieldProps<FieldCustomProps, Input, FormState[keyof FormState]>,
		) => JSX.Element;
		componentProps: FieldCustomProps;
	};

export const NamedField = <
	FieldCustomProps extends Record<string, any> = Record<string, any>,
	Input extends HTMLElement = HTMLInputElement,
	FormState extends Record<string, any> = Record<string, any>,
>({
	defaultValue,
	fieldArrayState,
	formState,
	name: providedName,
	fieldType,
	componentProps,
	validate,
	...rest
}: Props<FieldCustomProps, Input, FormState>): JSX.Element => {
	const {field, isInsideForm, isRegistered, name, validators} =
		useRegisterField<FormState>(
			fieldArrayState,
			formState,
			providedName,
			validate,
			fieldType,
			false,
			defaultValue,
		);

	if ((isInsideForm && !field) || !isRegistered) {
		return null;
	}

	return (
		<ValidatedField
			{...rest}
			defaultValue={defaultValue}
			validators={validators}
			componentProps={componentProps}
			formRef={formState?.formRef}
			fieldMeta={field}
			name={name}
			fieldType={field?.fieldType ?? fieldType}
		/>
	);
};
