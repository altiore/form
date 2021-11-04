import React from 'react';

import {useRegisterField} from '~/@common/hooks/use-register-field';
import {NamedFieldProps} from '~/@common/types';

import ValidatedField, {ValidatedFieldProps} from './validated-field';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const NamedField = <T,>({
	fieldArrayState,
	formState,
	providedName,
	...rest
}: NamedFieldProps<ValidatedFieldProps<T>, 'field' | 'name'>) => {
	const {field, isInsideForm, name} = useRegisterField(
		fieldArrayState,
		formState,
		providedName,
	);

	if (isInsideForm && !field) {
		return null;
	}

	return <ValidatedField {...rest} field={field} name={name} />;
};
