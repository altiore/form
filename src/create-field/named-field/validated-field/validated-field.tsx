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
	defaultValueJustAdded?: any;
	fieldMeta?: FieldMeta;
	fieldType?: FieldType;
	formRef?: MutableRefObject<HTMLFormElement>;
	name: string;
	validators: Array<ValidateFunc>;
	hideErrorsInXSeconds?: false | number;
};

export const ValidatedField = <
	FieldCustomProps extends Record<string, any>,
	Input extends HTMLElement = HTMLInputElement,
>({
	component,
	componentProps,
	defaultValue,
	defaultValueJustAdded,
	fieldMeta,
	fieldType,
	formRef,
	name,
	validators,
	hideErrorsInXSeconds,
}: IProps<FieldCustomProps, Input>): JSX.Element => {
	const inputRef = useRef<Input>();
	const {errors, setErrors, warnings} = useValidateInput<Input>(
		inputRef,
		validators,
		hideErrorsInXSeconds,
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
			defaultValueJustAdded !== undefined
				? defaultValueJustAdded ?? undefined
				: typeof fieldMeta?.defaultValue === 'undefined'
				? defaultValue
				: fieldMeta?.defaultValue;
		const isChecked = ['checkbox', 'radio'].includes(type);
		const inputProps: FieldInputProps<any> = {
			defaultChecked: isChecked ? defValue : undefined,
			defaultValue: isChecked ? undefined : defValue,
			multiple: fieldType === FieldType.SELECT_MULTIPLE ? true : undefined,
			name,
			ref: inputRef,
			type: [FieldType.SELECT, FieldType.SELECT_MULTIPLE].includes(fieldType)
				? undefined
				: type,
			value: type === 'checkbox' ? 'on' : undefined,
		};
		return React.createElement(component, {
			...componentProps,
			[IgnoredProp.FIELD_PROPS]: fieldMeta ?? {
				defaultValue: defValue,
				error: errors?.[0],
				errors,
				fieldType,
				isInvalid: Boolean(errors.length),
				name,
				setErrors,
				warning: warnings?.[0],
				warnings,
			},
			[IgnoredProp.INPUT_PROPS]: inputProps,
		});
	}, [
		componentProps,
		defaultValueJustAdded,
		errors,
		fieldMeta,
		fieldType,
		inputRef,
		name,
		setErrors,
	]);
};
