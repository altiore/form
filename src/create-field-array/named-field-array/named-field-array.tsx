import React, {useMemo} from 'react';

import {useRegisterField} from '~/@common/hooks/use-register-field';
import {
	FieldArrayProps,
	FieldOuterProps,
	NamedFieldProps,
} from '~/@common/types';

import ValidatedFieldArray from './validated-field-array';

type IProps<
	CustomFieldProps,
	ArrayItemProps extends Record<string, any> = Record<string, any>,
> = NamedFieldProps &
	FieldOuterProps & {
		component: (
			props: FieldArrayProps<CustomFieldProps, ArrayItemProps>,
		) => JSX.Element;
		componentProps: CustomFieldProps;
	};

export const NamedFieldArray = <
	CustomFieldProps extends Record<string, any> = Record<string, any>,
	ArrayItemProps extends Record<string, any> = Record<string, any>,
>({
	fieldArrayState,
	formState,
	name: providedName,
	validate,
	...rest
}: IProps<CustomFieldProps, ArrayItemProps>): JSX.Element => {
	const {field, isInsideForm, isRegistered, name, validators} =
		useRegisterField(
			fieldArrayState,
			formState,
			providedName,
			// undefined здесь означат, что пользователь не задал никакого типа для предоставленного поля
			// (для массива мы не поддерживаем пользовательские типы полей)
			validate,
			undefined,
			true,
			undefined,
		);

	const setItems = useMemo(() => formState?.setItems, [formState?.setItems]);

	if ((isInsideForm && !field) || !isRegistered) {
		return null;
	}

	return (
		<ValidatedFieldArray
			{...rest}
			field={field}
			setItems={setItems}
			name={name}
			validators={validators}
		/>
	);
};
