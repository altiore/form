import React, {useEffect} from 'react';

import {FormContext} from '~/@common/form-context';
import {ListInterface} from '~/@common/types';

export type FieldArrayProps = {
	name: string;
};

type InternalFieldArrayProps = {
	errors: string[];
	list: ListInterface;
	defaultValue: any[];
};

const FieldComponent: React.FC<any> = ({
	name,
	component,
	fields,
	registerField,
	...props
}) => {
	useEffect(() => {
		registerField(name, true);
	}, [name, registerField]);

	if (!fields?.[name]?.list) {
		return null;
	}

	return React.createElement(component, {
		...props,
		name,
	});
};

export const createFieldArray = function <T>(
	component: React.FC<T & InternalFieldArrayProps>,
): (props: FieldArrayProps) => JSX.Element {
	return ({name, ...props}) => {
		return (
			<FormContext.Consumer>
				{({defaultValues, errors, registerField, fields}) => {
					return (
						<FieldComponent
							{...{
								component,
								defaultValue: defaultValues?.[name],
								errors: errors?.[name] ?? [],
								fields,
								list: fields?.[name]?.list ?? [],
								name,
								registerField,
								...(props as T),
							}}
						/>
					);
				}}
			</FormContext.Consumer>
		);
	};
};
