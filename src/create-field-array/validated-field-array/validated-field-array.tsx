import React, {MutableRefObject, useMemo, useRef} from 'react';

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

	const list = useMemo(() => {
		if (typeof setItems === 'function') {
			const fieldName = fieldMeta.name;
			const addHandler = (field: any, index?: number) =>
				setItems(fieldName, (items: number[]) =>
					add(items, fieldName, field, index),
				);
			const removeHandler = (index: number) =>
				setItems(fieldName, (items: number[]) =>
					remove(items, fieldName, index),
				);
			const items = fieldMeta.items || [];
			const mapHandler = map.bind(
				{},
				addHandler,
				removeHandler,
				items,
				fieldName,
			);
			return {
				add: addHandler,
				map: mapHandler,
				remove: removeHandler,
			};
		}

		return stateList;
	}, [fieldMeta, setItems, stateList]);

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