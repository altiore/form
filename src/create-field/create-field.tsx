import React from 'react';

import {ArrayFieldContext} from '~/@common/array-field-context';
import {FormContext} from '~/@common/form-context';
import {ValidateFuncType} from '~/@common/types';

import ValidatedField, {InternalFieldProps} from './validated-field';

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
	return ({name, validators, ...props}): JSX.Element => {
		return (
			<FormContext.Consumer>
				{(form) => (
					<ArrayFieldContext.Consumer>
						{(value) => {
							const fieldName =
								value?.name && !name.match(new RegExp('^' + String(value.name)))
									? `${value.name}.${name}`
									: name;

							return (
								<ValidatedField
									field={form?.fields?.[fieldName]}
									registerField={form?.registerField}
									component={component}
									componentProps={props}
									validators={validators}
									name={fieldName}
								/>
							);
						}}
					</ArrayFieldContext.Consumer>
				)}
			</FormContext.Consumer>
		);
	};
};
