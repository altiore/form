import React, {useMemo} from 'react';

import {ArrayFieldContext} from '~/@common/array-field-context';
import {FormContext} from '~/@common/form-context';
import {useRegisterField} from '~/@common/hooks/use-register-field';
import {ArrayFieldState, FormContextState} from '~/@common/types';

import ArrayField, {
	InternalArrayFieldProps,
	ValidatedArrayFieldProps,
} from './validated-array-field';

type NamedFieldProps<T> = Omit<
	ValidatedArrayFieldProps<T>,
	'field' | 'name' | 'setItems'
> & {
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
	const {field, isInsideForm, name} = useRegisterField(
		arrayFieldState,
		formState,
		providedName,
		true,
	);

	const setItems = useMemo(() => formState?.setItems, [formState?.setItems]);

	if (isInsideForm && !field) {
		return null;
	}

	return <ArrayField {...rest} field={field} setItems={setItems} name={name} />;
};

export type ArrayFieldProps = {
	name: string;
	validators?: Array<(v: any) => string | undefined>;
};
/**
 * Создает массив полей
 *
 * @component
 *
 * @param {string} имя поля
 * @param {(string|undefined)} валидаторы - правила, по которым валидируются поля
 *
 * @typedef createArrayField
 * @return {Array} возвращает массив полей
 *
 *
 * @example
 *
 * import React from 'react';
 * import {ArrayFieldProps, createArrayField} from '~/create-array-field';
 *
 * const ArrayField = createArrayField<IFieldArray>(({list}) => {
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
export const createArrayField = <T extends ArrayFieldProps>(
	component: (
		props: Omit<T, 'validators'> & InternalArrayFieldProps,
	) => JSX.Element,
): ((props: T) => JSX.Element) => {
	return React.memo(({name, validators, ...props}) => {
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
	});
};
