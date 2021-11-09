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
		...mergeMetaPropsToField(fieldMeta, componentProps),
		errors,
		inputRef,
		name,
		setErrors,
	});
};

export const ValidatedField = React.memo(
	ValidatedFieldComponent,
) as typeof ValidatedFieldComponent;
