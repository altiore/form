import {
	MouseEvent,
	MouseEventHandler,
	useCallback,
	useMemo,
	useState,
} from 'react';

import isEqual from 'lodash/isEqual';

import {
	FieldMeta,
	InsertPosition,
	ListInterface,
	ListItem,
	ValidateFunc,
} from '~/@common/types';

import {add, map, remove} from './utils';

const DEF_GET_VALUE = () =>
	console.info('Получение переменной внутри валидации массива не реализовано');

export const useList = (
	name: string,
	validators: Array<ValidateFunc>,
	fieldMeta?: FieldMeta,
	setFormContextItems?: (
		fieldName: string,
		setItems: (i: number[]) => number[],
		getErrors: (i: number[]) => string[],
		defaultValue?: any,
	) => void,
	setDefValue?: (fieldName: string, defValue: any) => void,
): [ListInterface, string[]] => {
	const fieldName = useMemo(() => {
		return fieldMeta?.name ?? name;
	}, [name, fieldMeta?.name]);
	const [localItems, setLocalItems] = useState<number[]>([]);
	const items = useMemo(() => {
		if (fieldMeta?.items) {
			return fieldMeta.items;
		}
		return localItems;
	}, [fieldMeta?.items, localItems, name]);

	const [errors, setErrors] = useState<string[]>();

	const getErrors = useCallback(
		(curItems: number[]) => {
			const hasValidation = Boolean(validators?.length);
			const errorList: string[] = [];
			if (hasValidation) {
				validators.forEach((validateOne) => {
					// TODO: вместо того, чтоб передавать в эту функцию для валидации items,
					//   возможно, целесообразнее найти все значения массива
					const result = validateOne(curItems, name, DEF_GET_VALUE);
					if (result) {
						errorList.push(result);
					}
				});
			}

			return errorList;
		},
		[validators, name],
	);

	const setItems = useCallback(
		(set: (i: number[]) => number[], defaultValue?: any) => {
			if (setFormContextItems) {
				setFormContextItems(fieldName, set, getErrors, defaultValue);
			} else {
				setLocalItems((curItems) => {
					const newItems = set(curItems);
					setErrors((s) => {
						const errors = getErrors(newItems);
						if (isEqual(s, errors)) {
							return s;
						}
						return errors;
					});
					return newItems;
				});
			}
		},
		[fieldName, getErrors, setFormContextItems, setLocalItems],
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

	return useMemo<[ListInterface, string[]]>(() => {
		return [
			{
				add: simplifiedAddHandler,
				map: mapHandler,
				// TODO: этот обработчик функционирует непрозрачно для пользователя. Нужно упростить
				//  апишку, чтоб индексом был фактический отрендереный индекс элемента,
				//  сейчас в качестве индекса мы принимаем номерное значение элемента в массиве
				remove: removeHandler,
			},
			fieldMeta?.errors || errors,
		];
	}, [
		addHandler,
		errors,
		fieldMeta?.errors,
		fieldName,
		items,
		mapHandler,
		removeHandler,
	]);
};
