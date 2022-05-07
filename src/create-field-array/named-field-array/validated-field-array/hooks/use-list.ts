import {
	MouseEvent,
	MouseEventHandler,
	useCallback,
	useMemo,
	useState,
} from 'react';

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
		defaultValue?: any,
	) => void,
	setDefValue?: (fieldName: string, defValue: any) => void,
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
		(set: (i: number[]) => number[], defaultValue?: any) => {
			if (setFormContextItems) {
				setFormContextItems(fieldName, set, defaultValue);
			} else {
				setLocalItems(set);
			}
		},
		[fieldName, setFormContextItems, setLocalItems],
	);
	const addHandler = useCallback(
		(
			defaultFieldStateOrEvent: Record<string, any> | MouseEvent,
			index?: number,
			offset?: InsertPosition,
		) => {
			// проверяем, не является ли defaultFieldStateOrEvent синтетическим объектом события
			if (typeof defaultFieldStateOrEvent.persist === 'function') {
				setItems((s) => add(s, fieldName, index, offset), {});
			} else {
				// в случае, если defaultFieldStateOrEvent не синтетическое событие, -
				//   это дефолтное значение и остальные 2 параметра тоже имеют смысл
				setItems(
					(s) => add(s, fieldName, index, offset),
					defaultFieldStateOrEvent,
				);
			}
		},
		[fieldName, setDefValue, setItems],
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

	const simplifiedAddHandler = useCallback<
		((defaultFieldStateOrEvent?: Record<string, any>) => void) &
			MouseEventHandler<unknown>
	>(
		(defaultFieldStateOrEvent?: Record<string, any> | MouseEvent) => {
			addHandler(defaultFieldStateOrEvent);
		},
		[addHandler],
	);

	return useMemo<[ListInterface, number[]]>(() => {
		return [
			{
				add: simplifiedAddHandler,
				map: mapHandler,
				// TODO: этот обработчик функционирует непрозрачно для пользователя. Нужно упростить
				//  апишку, чтоб индексом был фактический отрендереный индекс элемента,
				//  сейчас в качестве индекса мы принимаем номерное значение элемента в массиве
				remove: removeHandler,
			},
			items,
		];
	}, [addHandler, fieldName, items, mapHandler, removeHandler]);
};
