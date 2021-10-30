import React, {MutableRefObject} from 'react';

import {FieldMeta, ValidateFuncType} from '~/@common/types';
import {useValidateInput} from '~/@common/use-validate/use-validate-input';

import {useInput} from './validated-field.hooks';

export type InternalFieldProps = {
	defaultValue?: any;
	inputRef: MutableRefObject<HTMLInputElement>;
	errors: string[];
};

export interface ValidatedFieldProps<T> {
	component: (props: Omit<T, 'validators'> & InternalFieldProps) => JSX.Element;
	componentProps: T;
	field: FieldMeta;
	name: string;
	validators: Array<ValidateFuncType>;
}

const ValidatedFieldComponent = <T,>({
	component,
	componentProps,
	field,
	name,
	validators,
}: ValidatedFieldProps<T>): JSX.Element => {
	const inputRef = useInput();

	const errors = useValidateInput(inputRef, validators, field);

	return React.createElement(component, {
		...componentProps,
		...(field ?? {}),
		errors,
		inputRef,
		name,
	});
};

export const ValidatedField = React.memo(
	ValidatedFieldComponent,
) as typeof ValidatedFieldComponent;
