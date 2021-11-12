import React from 'react';

import {useInput} from './hooks/use-input';
import {useValidateInput} from './hooks/use-validate-input';
import {ValidatedFieldProps} from './types/validated-field-props';
import {mergeMetaPropsToField} from './utils/merge-meta-props-to-field';

const ValidatedFieldComponent = <T,>({
	component,
	componentProps,
	field: fieldMeta,
	name,
	type,
	validators,
}: ValidatedFieldProps<T>): JSX.Element => {
	const inputRef = useInput();
	const {errors, setErrors} = useValidateInput(
		inputRef,
		validators,
		fieldMeta,
		type,
	);
	return React.createElement(component, {
		...mergeMetaPropsToField(componentProps, fieldMeta),
		error: errors?.[0],
		errors,
		inputRef,
		isInvalid: Boolean(errors.length),
		name,
		setErrors,
	});
};

export const ValidatedField = React.memo(
	ValidatedFieldComponent,
) as typeof ValidatedFieldComponent;
