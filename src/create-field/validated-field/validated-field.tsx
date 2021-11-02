import React, {MutableRefObject} from 'react';

import {useValidateInput} from '~/@common/hooks';
import {FieldMeta, ValidateFuncType} from '~/@common/types';

import {useInput} from './validated-field.hooks';

export type InternalFieldProps = {
	inputRef: MutableRefObject<HTMLInputElement>;
};

export interface ValidatedFieldProps<T> {
	component: (
		props: Omit<T, 'validators'> & InternalFieldProps & FieldMeta,
	) => JSX.Element;
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

	const {errors, setErrors} = useValidateInput(
		inputRef,
		validators as ValidateFuncType[],
		field,
	);

	return React.createElement(component, {
		...componentProps,
		...(field ?? {}),
		errors,
		inputRef,
		name,
		setErrors,
	});
};

export const ValidatedField = React.memo(
	ValidatedFieldComponent,
) as typeof ValidatedFieldComponent;
