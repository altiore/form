import React from 'react';

export const createField = (
	component: React.FC<any>,
): ((props: any) => JSX.Element) => {
	return (props) => {
		// TODO: сделать валидацию значения текущего инпута
		const error = 'Ошибка в поле "' + props.name + '"';
		return React.createElement(component, {
			error,
			...props,
		});
	};
};
