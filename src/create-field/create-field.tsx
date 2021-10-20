import React from 'react';

export type FieldProps = {
	name: string;
};

type ErrorProps = {
	errors: string[];
};

export const createField = <T extends FieldProps>(
	component: React.FC<T & ErrorProps>,
): ((props: T) => JSX.Element) => {
	return (props) => {
		// TODO: сделать валидацию значения текущего инпута
		const errors = ['Error 1'];
		return React.createElement(component, {
			errors,
			...props,
		});
	};
};
