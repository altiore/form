import React from 'react';

import {FormContext} from '~/@common/form-context';

import FieldComponentInsideForm from './field-component-inside-form';
import FieldComponentOutsideForm from './field-component-outside-form';

export type FieldProps = {
	name: string;
	validators?: Array<(v: any) => string | undefined>;
};

type InternalFieldProps = {
	defaultValue: any;
	errors: string[];
	inputRef: any;
};

/**
 * Компонент принимает пользовательский компонент и возвращает {name, validators, ...props}
 *
 * @component
 *
 * @typedef CreateField
 * @prop {React.ReactNode} [component] Пользовательский компонент
 *
 * @example
 * return (any)
 */

export const createField = <T extends FieldProps>(
	component: React.FC<T & InternalFieldProps>,
): ((props: T) => JSX.Element) => {
	return ({name, ...props}) => {
		return (
			<FormContext.Consumer>
				{(value) => {
					if (!value) {
						return (
							<FieldComponentOutsideForm
								{...{
									component,
									name,
									...(props as T),
								}}
							/>
						);
					}

					return (
						<FieldComponentInsideForm
							{...{
								component,
								form: value,
								name,
								...(props as T),
							}}
						/>
					);
				}}
			</FormContext.Consumer>
		);
	};
};
