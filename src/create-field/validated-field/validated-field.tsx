import React, {MutableRefObject, useEffect, useMemo, useRef} from 'react';

import {FieldMeta, RegisterField, ValidateFuncType} from '~/@common/types';
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
	registerField: RegisterField;
	validators: Array<ValidateFuncType>;
}

export const ValidatedField = <T,>({
	component,
	componentProps,
	field,
	name,
	registerField,
	validators,
}: ValidatedFieldProps<T>): JSX.Element => {
	const isInsideForm = useMemo(() => Boolean(registerField), [registerField]);

	useEffect(() => {
		if (isInsideForm) {
			return registerField(name, false);
		}
	}, [isInsideForm, name, registerField]);

	const inputRef = useRef<HTMLInputElement>(null);

	const errors = useValidateInput(inputRef, validators, field);

	if (isInsideForm && !field) {
		return null;
	}

	return React.createElement(component, {
		...componentProps,
		defaultValue: field?.defaultValue,
		errors,
		inputRef,
		name,
	});
};
