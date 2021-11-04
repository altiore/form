import {useCallback, useMemo, useState} from 'react';

import {
	FieldMeta,
	InsertPosition,
	ListInterface,
	ListItem,
} from '~/@common/types';

import {add, map, remove} from './utils';

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
			setItems((s) => add(s, fieldName, index, offset));
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
