import React from 'react';

export type FieldArrayProps = {
	name: string;
};

type ListProps = {
	errors: string[];
	list: {
		map: (
			arg: (
				el: {append: any; prepend: any; remove: any; name: string},
				index: number,
			) => any,
		) => string[];
		add: (
			obj?: Record<string, any>,
			position?: number | 'before' | 'after',
		) => void;
		remove: (index: number) => void;
	};
};

export const createFieldArray = <T extends FieldArrayProps>(
	component: React.FC<T & ListProps>,
): ((props: T) => JSX.Element) => {
	return (props) => {
		// TODO: сделать валидацию значения текущего инпута
		const errors = ['Error 1'];
		return React.createElement(component, {
			errors,
			list: {} as any,
			...props,
		});
	};
};
