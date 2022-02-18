import React, {useMemo, useRef} from 'react';

import {useValidateInput} from './hooks/use-validate-input';
import {ValidatedFieldProps} from './types/validated-field-props';
import {mergeMetaPropsToField} from './utils/merge-meta-props-to-field';

export const ValidatedField = <
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
	const inputRef = useRef<Input>();
	const {errors, setErrors} = useValidateInput<Input>(
		inputRef as any,
		validators,
		formRef,
		fieldMeta,
		type,
		name,
	);

	return useMemo(
		() =>
			React.createElement(component, {
				...mergeMetaPropsToField(componentProps, fieldMeta),
				error: errors?.[0],
				errors,
				inputRef,
				isInvalid: Boolean(errors.length),
				name,
				setErrors,
			}),
		[componentProps, fieldMeta, errors, inputRef, name, setErrors],
	);
};
