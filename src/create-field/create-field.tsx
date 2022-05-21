import React from 'react';

import {FieldArrayContext} from '~/@common/field-array-context';
import {FormContext} from '~/@common/form-context';
import {
	FieldOptions,
	FieldProps,
	FieldResProps,
	FieldType,
} from '~/@common/types';

import NamedField from './named-field';

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
 * interface IField {
 *  label: string;
 * }
 * const Field = createField<CustomAdditionalFieldProps>(({error, label, name}: FieldProps<IField>) => {
 *   return (
 *     <div>
 *       <label>{label}</label>
 *       <input name={name} />
 *       <span>{error}</span>
 *     </div>
 *   );
 * });
 */

export type FieldOpt = FieldOptions | FieldType;

// измеряется в миллисекундах
const DEF_HIDE_ERROR_IN_X_SEC = 7000;

export function createField<
	FieldCustomProps extends Record<string, any> = {name: string},
	Input extends HTMLElement = HTMLInputElement,
>(
	options: FieldOpt,
	component: (props: FieldProps<FieldCustomProps, Input>) => JSX.Element,
): <FormState extends Record<string, any> = Record<string, any>>(
	props: FieldResProps<FormState, FieldCustomProps>,
) => JSX.Element;

export function createField<
	FieldCustomProps extends Record<string, any> = {name: string},
	Input extends HTMLElement = HTMLInputElement,
>(
	component: (props: FieldProps<FieldCustomProps, Input>) => JSX.Element,
): <FormState extends Record<string, any> = Record<string, any>>(
	props: FieldResProps<FormState, FieldCustomProps>,
) => JSX.Element;

export function createField<
	FieldCustomProps extends Record<string, any> = {name: string},
	Input extends HTMLElement = HTMLInputElement,
>(
	optionsOrComponent:
		| FieldOpt
		| ((props: FieldProps<FieldCustomProps, Input>) => JSX.Element),
	componentInSecondParam?: (
		props: FieldProps<FieldCustomProps, Input>,
	) => JSX.Element,
): <FormState extends Record<string, any> = Record<string, any>>(
	props: FieldResProps<FormState, FieldCustomProps>,
) => JSX.Element {
	// Подготавливаем переменные к работе с ними

	// 1. options
	const options: FieldOptions = componentInSecondParam
		? typeof optionsOrComponent === 'object'
			? (optionsOrComponent as FieldOptions)
			: {fieldType: optionsOrComponent as FieldType}
		: undefined;

	// 2. fieldType
	const fieldType = options ? options.fieldType ?? undefined : undefined;

	// 3. hideErrorInXSec
	const hideErrorInXSec = options
		? typeof options.hideErrorInXSec !== 'undefined'
			? options.hideErrorInXSec
			: DEF_HIDE_ERROR_IN_X_SEC
		: DEF_HIDE_ERROR_IN_X_SEC;

	// 4. component
	const component: (props: FieldProps<FieldCustomProps, Input>) => JSX.Element =
		componentInSecondParam ??
		(optionsOrComponent as (
			props: FieldProps<FieldCustomProps, Input>,
		) => JSX.Element);

	return ({
		defaultValue,
		name,
		validate,
		...props
	}: FieldProps<FieldCustomProps, Input>): JSX.Element => {
		return (
			<FormContext.Consumer>
				{(formState) => (
					<FieldArrayContext.Consumer>
						{(fieldArrayState) => {
							return (
								<NamedField<FieldCustomProps, Input>
									defaultValue={defaultValue}
									fieldArrayState={fieldArrayState}
									formState={formState}
									component={component}
									componentProps={props as FieldCustomProps}
									name={name}
									fieldType={fieldType}
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
