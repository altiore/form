import {useCallback, useMemo, useState} from 'react';

import {ListInterface, ListItem} from '~/@common/types';
import {add, map, remove} from '~/create-array-field/array-field.utils';

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

	const list = useMemo(() => {
		return {
			add: addHandler,
			map: mapHandler,
			remove: removeHandler,
		};
	}, [addHandler, items, mapHandler, removeHandler]);

	return list;
};
