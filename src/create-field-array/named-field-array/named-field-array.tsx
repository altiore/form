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
	// TODO: Мы делаем валидаторы нереагирующими на изменение валидаторов, т.к. неясно как сохранить
	//   массив валидаторов так, чтоб он не изменялся при перерендере родителя
	const validators = useMemo(
		() => (typeof validate === 'function' ? [validate] : validate),
		[],
	);

	const {field, isInsideForm, isRegistered, name} = useRegisterField(
		fieldArrayState,
		formState,
		providedName,
		// undefined здесь означат, что пользователь не задал никакого типа для предоставленного поля
		// (для массива мы не поддерживаем пользовательские типы полей)
		validators,
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
