import React from 'react';

import {useRegisterField} from '~/@common/hooks/use-register-field';
import {FieldType, NamedFieldProps} from '~/@common/types';

import ValidatedField, {ValidatedFieldProps} from './validated-field';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const NamedField = <T,>({
	fieldArrayState,
	formState,
	providedName,
	type,
	...rest
}: NamedFieldProps<ValidatedFieldProps<T>, 'field' | 'name'> & {
	type?: FieldType;
}) => {
	const {field, isInsideForm, name} = useRegisterField(
		fieldArrayState,
		formState,
		providedName,
		type,
	);

	if (isInsideForm && !field) {
		return null;
	}

	return (
		<ValidatedField {...rest} formState={formState} field={field} name={name} />
	);
};
