import React, {MutableRefObject, useMemo, useRef} from 'react';

import {useValidateList} from '~/@common/hooks/use-validate-list';
import {FieldMeta, ListInterface, ValidateFuncType} from '~/@common/types';

import {add, map, remove, useList} from './validated-array-field.utils';

export type InternalArrayFieldProps = {
	listRef: MutableRefObject<HTMLElement>;
	errors: string[];
	list: ListInterface;
};

export interface ValidatedArrayFieldProps<T> {
	component: (
		props: Omit<T, 'validators'> & InternalArrayFieldProps,
	) => JSX.Element;
	componentProps: T;
	field: FieldMeta;
	name: string;
	setItems: (fieldName: string, setItems: (i: number[]) => number[]) => void;
	validators: Array<ValidateFuncType>;
}

const ValidatedArrayFieldComponent = <T,>({
	component,
	componentProps,
	field: fieldMeta,
	name,
	setItems,
	validators,
}: ValidatedArrayFieldProps<T>): JSX.Element => {
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

export const ValidatedArrayField = React.memo(
	ValidatedArrayFieldComponent,
) as typeof ValidatedArrayFieldComponent;
