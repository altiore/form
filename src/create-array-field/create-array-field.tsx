import React from 'react';

import {ArrayFieldContext} from '~/@common/array-field-context';
import {FormContext} from '~/@common/form-context';

import ArrayField, {InternalArrayFieldProps} from './validated-array-field';

export type ArrayFieldProps = {
	name: string;
	validators?: Array<(v: any) => string | undefined>;
};

export const createArrayField = <T extends ArrayFieldProps>(
	component: (
		props: Omit<T, 'validators'> & InternalArrayFieldProps,
	) => JSX.Element,
): ((props: T) => JSX.Element) => {
	return ({name, validators, ...props}) => {
		return (
			<FormContext.Consumer>
				{(form) => (
					<ArrayFieldContext.Consumer>
						{(value) => {
							const fieldName =
								value?.name && !name.match(new RegExp('^' + String(value.name)))
									? `${value.name}.${name}`
									: name;

							return (
								<ArrayField
									component={component}
									componentProps={props}
									field={form?.fields?.[fieldName]}
									getList={form?.getList}
									name={fieldName}
									registerField={form?.registerField}
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
