import React from 'react';

import {ArrayFieldContext} from '~/@common/array-field-context';
import {ListItem} from '~/@common/types';

export const map = (
	add: (fieldState: Record<string, any>, index?: number) => void,
	remove: (index: number) => void,
	list: number[],
	fieldName: string,
	callback: (el: ListItem, index: number) => JSX.Element,
): JSX.Element[] => {
	return list.map((index) => {
		const name = `${fieldName}.${index}`;
		return (
			<ArrayFieldContext.Provider key={name} value={{name}}>
				{callback(
					{
						append: () => add({}, index),
						key: name,
						prepend: () => add({}, index - 1),
						remove: () => remove(index),
					},
					index,
				)}
			</ArrayFieldContext.Provider>
		);
	});
};

export const add = (
	list: number[],
	fieldName: string,
	fieldState: Record<string, any> | Event | undefined = undefined,
	index?: number,
): number[] => {
	// TODO: проверить, что это не событие
	const field = fieldState.hasOwnProperty('originalEvent')
		? undefined
		: fieldState;

	console.log('add item to element', {
		field,
		fieldName,
		index,
	});

	return [...list, list.length ? Math.max(...list) + 1 : 0];
};

export const remove = (
	list: number[],
	fieldName: string,
	index: number,
): number[] => {
	return list.filter((i) => i !== index);
};
