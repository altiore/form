import React, {useCallback, useMemo, useState} from 'react';

import {ArrayFieldContext} from '~/@common/array-field-context';
import {ListInterface, ListItem} from '~/@common/types';

const Item = React.memo(({add, cb, remove, name, index}: any) => {
	return (
		<ArrayFieldContext.Provider key={name} value={{name}}>
			{cb(
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
			<Item
				key={name}
				add={add}
				cb={callback}
				remove={remove}
				name={name}
				index={index}
			/>
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

export const useList = (fieldName: string): ListInterface => {
	const [items, setItems] = useState<number[]>([]);

	const addHandler = useCallback(
		(fieldState: Record<string, any>, index?: number) => {
			setItems((s) => add(s, fieldName, fieldState, index));
		},
		[fieldName, setItems],
	);

	const removeHandler = useCallback(
		(index: number) => {
			setItems((s) => remove(s, fieldName, index));
		},
		[fieldName, setItems],
	);

	const mapHandler = useCallback(
		(callback: (el: ListItem, index: number) => JSX.Element) => {
			return map(addHandler, removeHandler, items, fieldName, callback);
		},
		[addHandler, removeHandler, fieldName, items],
	);

	return useMemo(() => {
		return {
			add: addHandler,
			map: mapHandler,
			remove: removeHandler,
		};
	}, [addHandler, items, mapHandler, removeHandler]);
};
