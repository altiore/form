import React, {useMemo} from 'react';

import {useRegisterField} from '~/@common/hooks/use-register-field';
import {NamedFieldProps, ValidateFunc} from '~/@common/types';

import ValidatedFieldArray, {
	ValidatedFieldArrayProps,
} from './validated-field-array';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const NamedFieldArray = <T,>({
	fieldArrayState,
	formState,
	providedName,
	validate,
	...rest
}: NamedFieldProps<
	ValidatedFieldArrayProps<T>,
	'field' | 'name' | 'setItems' | 'validators'
> & {validate: ValidateFunc | Array<ValidateFunc>}) => {
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
