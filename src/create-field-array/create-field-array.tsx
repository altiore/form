import React from 'react';

import {FieldArrayContext} from '~/@common/field-array-context';
import {FormContext} from '~/@common/form-context';
import {FieldMeta} from '~/@common/types';

import NamedFieldArray, {InternalFieldArrayProps} from './named-field-array';
import {FieldArrayProps} from './types/field-array-props';

/**
 * Создает массив полей
 *
 * @component
 *
 * @param component
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
 * 							<Field label={''} name="ingredient" validate={[minLength(3)]} />
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
		props: Omit<T, 'validate'> & InternalFieldArrayProps & FieldMeta,
	) => JSX.Element,
): (<Values extends Record<string, any> = Record<string, any>>(
	props: T & {name: keyof Values},
) => JSX.Element) => {
	return ({name, validate, ...props}) => {
		return (
			<FormContext.Consumer>
				{(formState) => (
					<FieldArrayContext.Consumer>
						{(fieldArrayState) => {
							return (
								<NamedFieldArray<Omit<T, 'name' | 'validate'>>
									fieldArrayState={fieldArrayState}
									formState={formState}
									component={component}
									componentProps={props}
									providedName={name}
									validate={validate}
								/>
							);
						}}
					</FieldArrayContext.Consumer>
				)}
			</FormContext.Consumer>
		);
	};
};
