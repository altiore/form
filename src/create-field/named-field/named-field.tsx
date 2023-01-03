import React, {useMemo} from 'react';

import {split} from 'lodash';

import {useRegisterField} from '~/@common/hooks/use-register-field';
import {
	FieldOptions,
	FieldOuterProps,
	FieldProps,
	NamedFieldProps,
} from '~/@common/types';

import ValidatedField from './validated-field';

type Props<
	FieldCustomProps extends Record<string, any>,
	Input extends HTMLElement = HTMLInputElement,
	FormState extends Record<string, any> = Record<string, any>,
> = NamedFieldProps &
	FieldOuterProps<FormState> &
	FieldOptions & {
		component: (
			props: FieldProps<FieldCustomProps, Input, FormState[keyof FormState]>,
		) => JSX.Element;
		componentProps: FieldCustomProps;
	};

export const NamedField = <
	FieldCustomProps extends Record<string, any> = Record<string, any>,
	Input extends HTMLElement = HTMLInputElement,
	FormState extends Record<string, any> = Record<string, any>,
>({
	defaultValue,
	fieldArrayState,
	formState,
	name: providedName,
	fieldType,
	componentProps,
	validate,
	...rest
}: Props<FieldCustomProps, Input, FormState>): JSX.Element => {
	const {field, isInsideForm, isRegistered, name, validators} =
		useRegisterField<FormState>(
			fieldArrayState,
			formState,
			providedName,
			validate,
			fieldType,
			false,
			defaultValue,
		);

	/**
	 * Переменная, добавленная из родительского массива для задания только что
	 * добавленных значений. null означает, что переменная была задана пустой
	 * имеет самый высокий приоритет при добавлении
	 */
	const defaultValueJustAdded = useMemo(() => {
		const s = formState?.fields;
		const fieldNameArr = split(name, '.');
		const fieldNameArrLength = fieldNameArr.length;
		if (fieldNameArrLength > 2) {
			const defValueFromPar =
				s?.[fieldNameArr.slice(0, fieldNameArrLength - 2).join('.')]
					?.defaultValue;
			return Array.isArray(defValueFromPar)
				? undefined
				: defValueFromPar
				? defValueFromPar?.[fieldNameArr[fieldNameArrLength - 1]] ?? null
				: undefined;
		}
	}, [formState?.fields, name]);

	if ((isInsideForm && !field) || !isRegistered) {
		return null;
	}

	return (
		<ValidatedField
			{...rest}
			defaultValue={defaultValue}
			defaultValueJustAdded={defaultValueJustAdded}
			validators={validators}
			componentProps={componentProps}
			formRef={formState?.formRef}
			fieldMeta={field}
			name={name}
			fieldType={field?.fieldType ?? fieldType}
			hideErrorsInXSeconds={formState?.hideErrorsInXSeconds ?? false}
		/>
	);
};
