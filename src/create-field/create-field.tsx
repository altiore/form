import React, {useEffect, useMemo} from 'react';

import {ArrayFieldContext} from '~/@common/array-field-context';
import {FormContext} from '~/@common/form-context';
import {
	ArrayFieldState,
	FormContextState,
	ValidateFuncType,
} from '~/@common/types';

import ValidatedField, {
	InternalFieldProps,
	ValidatedFieldProps,
} from './validated-field';

type NamedFieldProps<T> = Omit<ValidatedFieldProps<T>, 'field' | 'name'> & {
	arrayFieldState: ArrayFieldState;
	formState: FormContextState;
	providedName: string;
};

const NamedField = <T,>({
	arrayFieldState,
	formState,
	providedName,
	...rest
}: NamedFieldProps<T>) => {
	const fieldName = useMemo(() => {
		return arrayFieldState?.name &&
			!providedName.match(new RegExp('^' + String(arrayFieldState.name)))
			? `${arrayFieldState.name}.${providedName}`
			: providedName;
	}, [arrayFieldState?.name, providedName]);

	const registerField = useMemo(
		() => formState?.registerField,
		[formState?.registerField],
	);

	const isInsideForm = useMemo(() => Boolean(registerField), [registerField]);

	useEffect(() => {
		if (isInsideForm) {
			return registerField(fieldName, false);
		}
	}, [fieldName, isInsideForm, registerField]);

	const fields = useMemo(() => formState?.fields, [formState?.fields]);

	const field = useMemo(() => fields?.[fieldName], [fields, fieldName]);

	if (isInsideForm && !field) {
		return null;
	}

	return <ValidatedField {...rest} field={field} name={fieldName} />;
};

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
				{(formState) => (
					<ArrayFieldContext.Consumer>
						{(arrayFieldState) => {
							return (
								<NamedField<Omit<T, 'name' | 'validators'>>
									arrayFieldState={arrayFieldState}
									formState={formState}
									component={component}
									componentProps={props}
									providedName={name}
									validators={validators}
								/>
							);
						}}
					</ArrayFieldContext.Consumer>
				)}
			</FormContext.Consumer>
		);
	};
};
