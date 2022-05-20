import React from 'react';

import {FieldArrayContext} from '~/@common/field-array-context';
import {FormContext} from '~/@common/form-context';
import {FieldMeta, FieldType, ValidateFunc} from '~/@common/types';

import NamedField, {InternalFieldProps} from './named-field';

export type FieldProps = {
	name: string;
	defaultValue?: any;
	validate?: ValidateFunc | Array<ValidateFunc>;
};

/**
 * createField принимает пользовательский компонент и возвращает {name, validate, ...props}
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

type Options = {
	fieldType?: FieldType;
	hideErrorInXSec?: false | number;
};

// измеряется в миллисекундах
const DEF_HIDE_ERROR_IN_X_SEC = 6000;

export function createField<
	T extends FieldProps,
	Input extends HTMLElement = HTMLInputElement,
>(
	options: Options | FieldType,
	component: (
		props: Omit<T, 'validate'> & InternalFieldProps<Input> & FieldMeta,
	) => JSX.Element,
): <Values extends Record<string, any> = Record<string, any>>(
	props: T & {name: keyof Values},
) => JSX.Element;

export function createField<
	T extends FieldProps,
	Input extends HTMLElement = HTMLInputElement,
>(
	component: (
		props: Omit<T, 'validate'> & InternalFieldProps<Input> & FieldMeta,
	) => JSX.Element,
): <Values extends Record<string, any> = Record<string, any>>(
	props: T & {name: keyof Values},
) => JSX.Element;

export function createField<
	T extends FieldProps,
	Input extends HTMLElement = HTMLInputElement,
>(
	optionsOrComponent:
		| FieldType
		| Options
		| ((
				props: Omit<T, 'validate'> & InternalFieldProps<Input> & FieldMeta,
		  ) => JSX.Element),
	componentInSecondParam?: (
		props: Omit<T, 'validate'> & InternalFieldProps<Input> & FieldMeta,
	) => JSX.Element,
): <Values extends Record<string, any> = Record<string, any>>(
	props: T & {name: keyof Values},
) => JSX.Element {
	const options = componentInSecondParam
		? typeof optionsOrComponent === 'object'
			? (optionsOrComponent as Options)
			: {fieldType: optionsOrComponent as FieldType}
		: undefined;
	const fieldType = options ? options.fieldType ?? undefined : undefined;
	const hideErrorInXSec = options
		? typeof options.hideErrorInXSec !== 'undefined'
			? options.hideErrorInXSec
			: DEF_HIDE_ERROR_IN_X_SEC
		: DEF_HIDE_ERROR_IN_X_SEC;
	const component: (
		props: Omit<T, 'validate'> & InternalFieldProps<Input> & FieldMeta,
	) => JSX.Element =
		componentInSecondParam ??
		(optionsOrComponent as (
			props: Omit<T, 'validate'> & InternalFieldProps<Input> & FieldMeta,
		) => JSX.Element);

	return ({name, validate, ...props}): JSX.Element => {
		return (
			<FormContext.Consumer>
				{(formState) => (
					<FieldArrayContext.Consumer>
						{(fieldArrayState) => {
							return (
								<NamedField<Omit<T, 'name' | 'validate'>, Input>
									fieldArrayState={fieldArrayState}
									formState={formState}
									component={component}
									componentProps={props}
									providedName={name}
									type={fieldType}
									validate={validate}
									hideErrorInXSec={hideErrorInXSec}
								/>
							);
						}}
					</FieldArrayContext.Consumer>
				)}
			</FormContext.Consumer>
		);
	};
}
