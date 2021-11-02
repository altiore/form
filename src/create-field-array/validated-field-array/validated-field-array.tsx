import React, {MutableRefObject, useCallback, useMemo, useRef} from 'react';

import {useValidateList} from '~/@common/hooks/use-validate-list';
import {FieldMeta, ListInterface, ValidateFuncType} from '~/@common/types';

import {add, map, remove, useList} from './validated-field-array.utils';

export type InternalFieldArrayProps = {
	listRef: MutableRefObject<HTMLElement>;
	errors: string[];
	list: ListInterface;
};

export interface ValidatedFieldArrayProps<T> {
	component: (
		props: Omit<T, 'validators'> & InternalFieldArrayProps,
	) => JSX.Element;
	componentProps: T;
	field: FieldMeta;
	name: string;
	setItems: (fieldName: string, setItems: (i: number[]) => number[]) => void;
	validators: Array<ValidateFuncType>;
}

const ValidatedFieldArrayComponent = <T,>({
	component,
	componentProps,
	field: fieldMeta,
	name,
	setItems,
	validators,
}: ValidatedFieldArrayProps<T>): JSX.Element => {
	const listRef = useRef<HTMLElement>(null);

	const stateList = useList(name);

	const addHandler = useCallback(
		(fieldName: string, field: any, index?: number) =>
			setItems(fieldName, (items: number[]) =>
				add(items, fieldName, field, index),
			),
		[setItems],
	);

	const removeHandler = useCallback(
		(fieldName: string, index: number) =>
			setItems(fieldName, (items: number[]) => remove(items, fieldName, index)),
		[setItems],
	);

	const list = useMemo(() => {
		if (typeof setItems === 'function') {
			const fieldName = fieldMeta.name;

			const items = fieldMeta.items || [];
			return {
				add: addHandler.bind({}, fieldName),
				map: map.bind({}, addHandler, removeHandler, items, fieldName),
				remove: removeHandler.bind({}, fieldName),
			};
		}

		return stateList;
	}, [addHandler, fieldMeta, removeHandler, setItems, stateList]);

	const errors = useValidateList(listRef, validators, fieldMeta);

	return React.createElement(component, {
		...componentProps,
		errors,
		list,
		listRef,
		name,
	});
};

export const ValidatedFieldArray = React.memo(
	ValidatedFieldArrayComponent,
) as typeof ValidatedFieldArrayComponent;
