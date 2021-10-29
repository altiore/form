import React, {MutableRefObject, useRef} from 'react';

import {FieldMeta, ValidateFuncType} from '~/@common/types';
import {useValidateInput} from '~/@common/use-validate/use-validate-input';

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

export const ValidatedField = <T,>({
	component,
	componentProps,
	field,
	name,
	validators,
}: ValidatedFieldProps<T>): JSX.Element => {
	const inputRef = useRef<HTMLInputElement>(null);

	const errors = useValidateInput(inputRef, validators, field);

	return React.createElement(component, {
		...componentProps,
		defaultValue: field?.defaultValue,
		errors,
		inputRef,
		name,
	});
};
