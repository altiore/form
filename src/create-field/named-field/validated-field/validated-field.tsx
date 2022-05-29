import React, {MutableRefObject, useEffect, useMemo, useRef} from 'react';

import intersection from 'lodash/intersection';

import {forbiddenPropsError} from '~/@common/errors';
import {
	FieldInputProps,
	FieldMeta,
	FieldProps,
	FieldType,
	IgnoredProp,
	ValidateFunc,
} from '~/@common/types';
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
}: IProps<FieldCustomProps, Input>): JSX.Element => {
	const inputRef = useRef<Input>();
	const {errors, setErrors} = useValidateInput<Input>(
		inputRef as any,
		validators,
		formRef,
		fieldMeta,
		fieldType,
		name,
	);

	useEffect(() => {
		const forbiddenProps = intersection(
			Object.keys(componentProps),
			Object.values(IgnoredProp),
		);
		forbiddenPropsError(forbiddenProps, name);

		if (forbiddenProps.includes('type')) {
			console.error(
				'Поле type используется для указания типа внутреннего поля ввода input.' +
					' Используйте первый аргумент функции createField для корректного задания внутреннего' +
					' типа поля ввода. Например: createField(FieldType.TEXT, FieldViewComponent)',
			);
		}
	}, [componentProps, name]);

	return useMemo(() => {
		const type = getInputTypeByFieldType(fieldType);
		const defValue =
			typeof fieldMeta?.defaultValue === 'undefined'
				? defaultValue
				: fieldMeta?.defaultValue;
		const isChecked = ['checkbox', 'radio'].includes(type);
		const inputProps: FieldInputProps<any> = {
			defaultChecked: isChecked ? defValue : undefined,
			defaultValue: isChecked ? undefined : defValue,
			name,
			type: [FieldType.SELECT, FieldType.SELECT_MULTIPLE].includes(fieldType)
				? undefined
				: type,
			value: type === 'checkbox' ? 'on' : undefined,
		};
		return React.createElement(component, {
			...componentProps,
			[IgnoredProp.FIELD_PROPS]: fieldMeta
				? {...fieldMeta, inputRef}
				: {
						defaultValue: defValue,
						error: errors?.[0],
						errors,
						fieldType,
						inputRef,
						isInvalid: Boolean(errors.length),
						name,
						setErrors,
				  },
			[IgnoredProp.INPUT_PROPS]: inputProps,
		});
	}, [componentProps, fieldMeta, fieldType, errors, inputRef, name, setErrors]);
};
