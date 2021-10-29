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

/**
 * createField принимает пользовательский компонент и возвращает {name, validators, ...props}
 *
 * @see https://@altiore/form'.github.io/...
 * @category Components
 *
 * @typedef createField
 * @prop {React.ReactNode} [component] [React.ReactNode] Компонент
 *
 * @example
 * import {FieldProps, createField} from '@altiore/form';
 *
 * interface IField extends FieldProps {
 *  label: string;
 * }
 * const Field = createField<IField>(({errors, label, name}) => {
 *   return (
 *     <div>
 *       <span>{label}</span>
 *       <span>{name}</span>
 *       <input name={name} />
 *       <span>{errors[0]}</span>
 *     </div>
 *   );
 * });
 */
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
