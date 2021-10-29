import React from 'react';

import ArrayFieldChild, {
	ArrayFieldChildProps,
} from '~/@common/array-field.child';
import FormChild from '~/@common/form.child';

import ArrayField, {
	InternalArrayFieldProps,
	ValidatedArrayFieldProps,
} from './validated-array-field';

export type ArrayFieldProps = {
	name: string;
	validators?: Array<(v: any) => string | undefined>;
};

export const createArrayField = <T extends ArrayFieldProps>(
	component: (
		props: Omit<T, 'validators'> & InternalArrayFieldProps,
	) => JSX.Element,
): ((props: T) => JSX.Element) => {
	return React.memo<T>(({name, validators, ...props}) => {
		type FieldProps = Omit<
			ValidatedArrayFieldProps<Omit<T, 'name' | 'validators'>>,
			'field' | 'name'
		>;
		type ArrayComponentChildProps = Omit<
			ArrayFieldChildProps<FieldProps>,
			'field' | 'name' | 'registerField'
		>;
		type FormChildProps = Omit<ArrayComponentChildProps, 'field' | 'name'>;

		return (
			<FormChild<FormChildProps>
				component={ArrayFieldChild}
				componentProps={{
					component: ArrayField,
					componentProps: {
						component,
						componentProps: props,
						validators,
					},
				}}
				isArray={true}
				name={name}
			/>
		);
	}) as any;
};
