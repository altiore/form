import React, {useMemo} from 'react';

import {useRegisterField} from '~/@common/hooks/use-register-field';
import {NamedFieldProps} from '~/@common/types';

import ValidatedField, {ValidatedFieldProps} from './validated-field';

type Props<T, Input> = NamedFieldProps<
	ValidatedFieldProps<T, Input>,
	'field' | 'name'
>;

export const NamedField = <
	T extends {defaultValue?: any},
	Input extends HTMLElement = HTMLInputElement,
>({
	fieldArrayState,
	formState,
	providedName,
	type,
	componentProps,
	validate,
	...rest
}: Props<T, Input>): JSX.Element => {
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
		validators,
		type,
		false,
		componentProps.defaultValue,
	);

	if ((isInsideForm && !field) || !isRegistered) {
		return null;
	}

	return (
		<ValidatedField
			{...rest}
			validators={validators}
			componentProps={componentProps}
			formRef={formState?.formRef}
			field={field}
			name={name}
			type={type}
		/>
	);
};
