import React, {useMemo} from 'react';

import {FieldArrayContext} from '~/@common/field-array-context';
import {FormContext} from '~/@common/form-context';
import {useRegisterField} from '~/@common/hooks/use-register-field';
import {
	FieldArrayState,
	FormContextState,
	ValidateFuncType,
} from '~/@common/types';

import FieldArray, {
	InternalFieldArrayProps,
	ValidatedFieldArrayProps,
} from './validated-field-array';

type NamedFieldProps<T> = Omit<
	ValidatedFieldArrayProps<T>,
	'field' | 'name' | 'setItems'
> & {
	fieldArrayState: FieldArrayState;
	formState: FormContextState;
	providedName: string;
};

const NamedField = <T,>({
	fieldArrayState,
	formState,
	providedName,
	...rest
}: NamedFieldProps<T>) => {
	const {field, isInsideForm, name} = useRegisterField(
		fieldArrayState,
		formState,
		providedName,
		true,
	);

	const setItems = useMemo(() => formState?.setItems, [formState?.setItems]);

	if (isInsideForm && !field) {
		return null;
	}

	return <FieldArray {...rest} field={field} setItems={setItems} name={name} />;
};

export type FieldArrayProps = {
	name: string;
	validators?: Array<ValidateFuncType>;
};
/**
 * Создает массив полей
 *
 * @component
 *
 * @param {string} имя поля
 *
 * @typedef createFieldArray
 * @return {Array} возвращает массив полей
 *
 *
 * @example
 *
 * import React from 'react';
 * import {FieldArrayProps, createFieldArray} from '~/create-field-array';
 *
 * const FieldArray = createFieldArray<FieldArrayProps>(({list}) => {
 *	return (
 *		<div>
 *			{list.map(({key, remove, append, prepend}) => {
 *				return (
 *					<div key={key}>
 *						<div style={{display: 'flex'}}>
 * 							<Field label={''} name="ingredient" validators={[minLength(3)]} />
 *							<ArrayTags name="tags" />
 *							<button onClick={remove} type="button">
 *								-
 *							</button>
 *							<button onClick={append} type="button">
 *								after
 *							</button>
 *							<button onClick={prepend} type="button">
 *								before
 *							</button>
 *						</div>
 *					</div>
 *				);
 *			})}
 *			<button onClick={list.add} type="button">
 *				Добавить ингредиент
 *			</button>
 *		</div>
 *	);
 * });
 */
export const createFieldArray = <T extends FieldArrayProps>(
	component: (
		props: Omit<T, 'validators'> & InternalFieldArrayProps,
	) => JSX.Element,
): ((props: T) => JSX.Element) => {
	return React.memo(({name, validators, ...props}) => {
		return (
			<FormContext.Consumer>
				{(formState) => (
					<FieldArrayContext.Consumer>
						{(fieldArrayState) => {
							return (
								<NamedField<Omit<T, 'name' | 'validators'>>
									fieldArrayState={fieldArrayState}
									formState={formState}
									component={component}
									componentProps={props}
									providedName={name}
									validators={validators}
								/>
							);
						}}
					</FieldArrayContext.Consumer>
				)}
			</FormContext.Consumer>
		);
	});
};
