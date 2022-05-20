import React, {useMemo, useRef} from 'react';

import {FieldType, ValidateFunc} from '~/@common/types';
import {inputTypeByType} from '~/@common/utils';

import {useValidateInput} from './hooks/use-validate-input';
import {ValidatedFieldProps} from './types/validated-field-props';

export const ValidatedField = <
	T extends {defaultValue?: any},
	Input extends HTMLElement = HTMLInputElement,
>({
	component,
	componentProps,
	field: fieldMeta,
	formRef,
	name,
	type,
	validators,
	hideErrorInXSec,
}: Omit<ValidatedFieldProps<T, Input>, 'validate'> & {
	validators: Array<ValidateFunc>;
}): JSX.Element => {
	const inputRef = useRef<Input>();
	const {errors, setErrors} = useValidateInput<Input>(
		inputRef as any,
		validators,
		formRef,
		fieldMeta,
		type,
		name,
		hideErrorInXSec,
	);

	return useMemo(
		() =>
			React.createElement(component, {
				...componentProps,
				...(fieldMeta || ({} as any)),
				defaultValue:
					typeof fieldMeta?.defaultValue === 'undefined'
						? componentProps.defaultValue
						: fieldMeta?.defaultValue,
				error: errors?.[0],
				errors,
				inputRef,
				isInvalid: Boolean(errors.length),
				name,
				setErrors,
				type: inputTypeByType.has(type)
					? inputTypeByType.get(type)
					: inputTypeByType.get(FieldType.TEXT),
			}),
		[componentProps, fieldMeta, errors, inputRef, name, setErrors],
	);
};
