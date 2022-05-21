import React, {MutableRefObject, useMemo, useRef} from 'react';

import {FieldMeta, FieldProps, FieldType, ValidateFunc} from '~/@common/types';
import {getInputTypeByFieldType} from '~/@common/utils';

import {useValidateInput} from './hooks/use-validate-input';

type IProps<
	FieldCustomProps extends Record<string, any>,
	Input extends HTMLElement = HTMLInputElement,
> = {
	component: (props: FieldProps<FieldCustomProps, Input>) => JSX.Element;
	componentProps: FieldCustomProps;
	defaultValue?: any;
	fieldMeta?: FieldMeta;
	validators: Array<ValidateFunc>;
	name: string;
	formRef?: MutableRefObject<HTMLFormElement>;
	fieldType?: FieldType;
	hideErrorInXSec?: false | number;
};

export const ValidatedField = <
	FieldCustomProps extends Record<string, any>,
	Input extends HTMLElement = HTMLInputElement,
>({
	component,
	componentProps,
	defaultValue,
	fieldMeta,
	formRef,
	name,
	fieldType,
	validators,
	hideErrorInXSec,
}: IProps<FieldCustomProps, Input>): JSX.Element => {
	const inputRef = useRef<Input>();
	const {errors, setErrors} = useValidateInput<Input>(
		inputRef as any,
		validators,
		formRef,
		fieldMeta,
		fieldType,
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
						? defaultValue
						: fieldMeta?.defaultValue,
				error: errors?.[0],
				errors,
				inputRef,
				isInvalid: Boolean(errors.length),
				name,
				setErrors,
				type: getInputTypeByFieldType(fieldType),
			}),
		[componentProps, fieldMeta, errors, inputRef, name, setErrors],
	);
};
