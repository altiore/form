import React from 'react';

import {FormContext} from '~/@common/form-context';

import {List} from './list';

export type FieldArrayProps = {
	name: string;
};


type InternalFieldArrayProps = {
	errors: string[];
	list: List;
	defaultValue: any[];
};

export const createFieldArray = function <T>(
	component: React.FC<T & InternalFieldArrayProps>,
): ((props: FieldArrayProps) => JSX.Element) {
	return ({name, ...props}) => {
		return (
			<FormContext.Consumer>
				{(value) => {
					const list = new List(value.defaultValues?.[name], name);
					return React.createElement(component, {
						defaultValue: value.defaultValues?.[name],
						errors: value.errors?.[name] ?? [],
						list,
						name,
						...props as T,
					});
				}}
			</FormContext.Consumer>
		);
	};
};
