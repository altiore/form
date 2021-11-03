import React, {SyntheticEvent, useCallback, useMemo, useState} from 'react';

import {FieldArrayContext} from '~/@common/field-array-context';
import {FieldMeta, ListInterface, ListItem} from '~/@common/types';

enum InsertPosition {
	BEFORE = 0,
	AFTER = 1,
}

const Item = React.memo(({add, cb, fieldName, remove, name, index}: any) => {
	const removeHandler = useCallback(() => {
		remove(index);
	}, [index, remove]);

	const append = useCallback(
		(object: any) => {
			add(object, index, InsertPosition.AFTER);
		},
		[add, index],
	);

	const prepend = useCallback(
		(object: any) => {
			add(object, index, InsertPosition.BEFORE);
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
					remove: removeHandler,
				},
				index,
			)}
		</FieldArrayContext.Provider>
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
				fieldName={fieldName}
				index={index}
			/>
		);
	});
};

export const add = (
	list: number[],
	fieldName: string,
	fieldState: Record<string, any> | SyntheticEvent | undefined = undefined,
	index?: number,
	offset?: InsertPosition,
): number[] => {
	const fieldDefaultValue =
		typeof fieldState.persist === 'function' ? undefined : fieldState;

	// TODO: добавить fieldDefaultValue значение в дефолтные значения
	console.log('add item to element', {
		fieldDefaultValue,
		fieldName,
		index,
	});

	const lastElement = Math.max(...list);

	if (typeof index === 'number') {
		const baseListItemIndex = list.indexOf(index);
		return [
			...list.slice(0, baseListItemIndex + offset ?? InsertPosition.AFTER),
			lastElement + 1,
			...list.slice(baseListItemIndex + offset ?? InsertPosition.AFTER),
		];
	}

	return [...list, list.length ? lastElement + 1 : 0];
};

export const remove = (
	list: number[],
	fieldName: string,
	index: number,
): number[] => {
	return list.filter((i) => i !== index);
};

export const useList = (
	name: string,
	fieldMeta?: FieldMeta,
	setFormContextItems?: (
		fieldName: string,
		setItems: (i: number[]) => number[],
	) => void,
): [ListInterface, number[]] => {
	const fieldName = useMemo(() => {
		return fieldMeta?.name ?? name;
	}, [name, fieldMeta?.name]);

	const [localItems, setLocalItems] = useState<number[]>([]);

	const items = useMemo(() => {
		if (fieldMeta?.items) {
			return fieldMeta.items;
		}
		return localItems;
	}, [fieldMeta, localItems]);
	const setItems = useCallback(
		(set: (i: number[]) => number[]) => {
			if (setFormContextItems) {
				setFormContextItems(fieldName, set);
			} else {
				setLocalItems(set);
			}
		},
		[fieldName, setFormContextItems, setLocalItems],
	);

	const addHandler = useCallback(
		(
			fieldState: Record<string, any>,
			index?: number,
			offset?: InsertPosition,
		) => {
			setItems((s) => add(s, fieldName, fieldState, index, offset));
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
		return [
			{
				add: addHandler,
				map: mapHandler,
				remove: removeHandler,
			},
			items,
		];
	}, [addHandler, fieldName, items, mapHandler, removeHandler]);
};
