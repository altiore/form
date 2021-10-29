import React from 'react';

import ArrayFieldChild, {
	ArrayFieldChildProps,
} from '~/@common/array-field.child';
import FormChild from '~/@common/form.child';
import {ValidateFuncType} from '~/@common/types';

import ValidatedField, {
	InternalFieldProps,
	ValidatedFieldProps,
} from './validated-field';

export type FieldProps = {
	name: string;
	validators?: Array<ValidateFuncType>;
};

export const createField = <T extends FieldProps>(
	component: (props: Omit<T, 'validators'> & InternalFieldProps) => JSX.Element,
): ((props: T) => JSX.Element) => {
	return React.memo<T>(({name, validators, ...props}) => {
		type FieldProps = Omit<
			ValidatedFieldProps<Omit<T, 'name' | 'validators'>>,
			'field' | 'name'
		>;
		type ArrayComponentChildProps = Omit<
			ArrayFieldChildProps<FieldProps>,
			'field' | 'name'
		>;
		type FormChildProps = Omit<
			ArrayComponentChildProps,
			'field' | 'name' | 'registerField'
		>;

		return (
			<FormChild<FormChildProps>
				component={ArrayFieldChild}
				componentProps={{
					component: ValidatedField,
					componentProps: {
						component,
						componentProps: props,
						validators,
					},
				}}
				isArray={false}
				name={name}
			/>
		);
	});
};
