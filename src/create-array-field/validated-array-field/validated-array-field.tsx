import React, {MutableRefObject, useMemo, useRef} from 'react';

import {useValidateList} from '~/@common/hooks/use-validate-list';
import {FieldMeta, ListInterface, ValidateFuncType} from '~/@common/types';

import {useList} from './use-list';

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
	getList: (fieldMeta: FieldMeta) => ListInterface;
	name: string;
	validators: Array<ValidateFuncType>;
}

const ValidatedArrayFieldComponent = <T,>({
	component,
	componentProps,
	field,
	getList,
	name,
	validators,
}: ValidatedArrayFieldProps<T>): JSX.Element => {
	const listRef = useRef<HTMLElement>(null);

	const stateList = useList(name);

	const list = useMemo(() => {
		if (typeof getList === 'function') {
			return getList(field);
		}

		return stateList;
	}, [field, getList, stateList]);

	const errors = useValidateList(listRef, validators, field);

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
