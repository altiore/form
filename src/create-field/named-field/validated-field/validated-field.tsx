import React, {MutableRefObject} from 'react';

import {useInput} from './hooks/use-input';
import {useValidateInput} from './hooks/use-validate-input';
import {ValidatedFieldProps} from './types/validated-field-props';
import {mergeMetaPropsToField} from './utils/merge-meta-props-to-field';

const ValidatedFieldComponent = <
	T,
	Input extends HTMLElement = HTMLInputElement,
>({
	component,
	componentProps,
	field: fieldMeta,
	formRef,
	name,
	type,
	validators,
}: ValidatedFieldProps<T, Input>): JSX.Element => {
	const {customRef, inputRef} = useInput(name, formRef);
	const {errors, setErrors} = useValidateInput<Input>(
		inputRef as any,
		validators,
		fieldMeta,
		type,
	);

	return React.createElement(component, {
		...mergeMetaPropsToField(componentProps, fieldMeta),
		error: errors?.[0],
		errors,
		inputRef: customRef as MutableRefObject<any>,
		isInvalid: Boolean(errors.length),
		name,
		setErrors,
	});
};

export const ValidatedField = React.memo(
	ValidatedFieldComponent,
) as typeof ValidatedFieldComponent;
