import React from 'react';

import {FieldArrayContext} from '~/@common/field-array-context';
import {FormContext} from '~/@common/form-context';
import {FieldArrayProps, FieldOuterProps} from '~/@common/types';

import NamedFieldArray from './named-field-array';

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
 * import {createFieldArray} from '~/create-field-array';
 *
 * const FieldArray = createFieldArray(({list}) => {
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
export const createFieldArray = <
	CustomFieldProps extends Record<string, any> = {name: string},
	ArrayItemProps extends Record<string, any> = Record<string, any>,
>(
	component: (
		props: FieldArrayProps<CustomFieldProps, ArrayItemProps>,
	) => JSX.Element,
): (<FormState extends Record<string, any> = Record<string, any>>(
	props: CustomFieldProps & FieldOuterProps<FormState>,
) => JSX.Element) => {
	return ({
		defaultValue,
		name,
		validate,
		...props
	}: FieldArrayProps<CustomFieldProps, ArrayItemProps>) => {
		return (
			<FormContext.Consumer>
				{(formState) => (
					<FieldArrayContext.Consumer>
						{(fieldArrayState) => {
							return (
								<NamedFieldArray<CustomFieldProps, ArrayItemProps>
									fieldArrayState={fieldArrayState}
									formState={formState}
									defaultValue={defaultValue}
									validate={validate}
									name={name}
									component={component}
									componentProps={props as CustomFieldProps}
								/>
							);
						}}
					</FieldArrayContext.Consumer>
				)}
			</FormContext.Consumer>
		);
	};
};
