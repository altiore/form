import React, {useCallback, useMemo, useState} from 'react';

import {FieldArrayContext} from '~/@common/field-array-context';
import {ListInterface, ListItem} from '~/@common/types';

const Item = React.memo(({add, cb, fieldName, remove, name, index}: any) => {
	const handleRemove = useCallback(() => {
		remove(fieldName, index);
	}, [fieldName, index, remove]);

	const append = useCallback(
		(object: any) => {
			// TODO: уточнить реализацию
			add(fieldName, object, index);
		},
		[add, fieldName, index],
	);

	const prepend = useCallback(
		(object: any) => {
			// TODO: уточнить реализацию
			add(fieldName, object, index);
		},
		[add, fieldName, index],
	);

	return (
		<FieldArrayContext.Provider key={name} value={{name}}>
			{cb(
				{
					append,
					key: name,
					prepend,
					remove: handleRemove,
				},
				index,
			)}
		</FieldArrayContext.Provider>
	);
});

export const map = (
	add: (fieldState: Record<string, any>, index?: number) => void,
	remove: (fieldName: string, index: number) => void,
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
				fieldName={fieldName}
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
		(fieldName: string, index: number) => {
			setItems((s) => remove(s, fieldName, index));
		},
		[setItems],
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
			remove: removeHandler.bind({}, fieldName),
		};
	}, [addHandler, fieldName, items, mapHandler, removeHandler]);
};
