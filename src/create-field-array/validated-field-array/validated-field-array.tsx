import React, {MutableRefObject, useRef} from 'react';

import {useValidateList} from '~/@common/hooks/use-validate-list';
import {FieldMeta, ListInterface, ValidateFuncType} from '~/@common/types';

import {useList} from './validated-field-array.utils';

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

	const [list, items] = useList(name, fieldMeta, setItems);

	const errors = useValidateList(listRef, validators, items);
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
