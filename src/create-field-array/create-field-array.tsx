import React from 'react';

import {List} from './list';

export type FieldArrayProps<T> = {
	name: string;
	items: T[];
};


type ListProps = {
	errors: string[];
	list: List;
};

export const createFieldArray = function <T>(
	component: React.FC<T & ListProps>,
): ((props: FieldArrayProps<T>) => JSX.Element) {
	return (props) => {
		const errors = ['Error 1'];
		return React.createElement(component, {
			errors,
			list: {} as any,
			...props,
		});
	};
};
