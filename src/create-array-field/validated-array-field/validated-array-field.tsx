import React, {MutableRefObject, useEffect, useMemo, useRef} from 'react';

import {
	FieldMeta,
	ListInterface,
	RegisterField,
	ValidateFuncType,
} from '~/@common/types';
import {useValidateList} from '~/@common/use-validate/use-validate-list';

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
	getList: (fieldName: string) => ListInterface;
	name: string;
	registerField: RegisterField;
	validators: Array<ValidateFuncType>;
}

export const ValidatedArrayField = <T,>({
	component,
	componentProps,
	field,
	getList,
	name,
	registerField,
	validators,
}: ValidatedArrayFieldProps<T>): JSX.Element => {
	const isInsideForm = useMemo(() => Boolean(registerField), [registerField]);

	useEffect(() => {
		if (isInsideForm) {
			return registerField(name, true);
		}
	}, [isInsideForm, name, registerField]);

	const listRef = useRef<HTMLElement>(null);

	const stateList = useList(name);

	const list = useMemo(() => {
		if (typeof getList === 'function') {
			return getList(name);
		}

		return stateList;
	}, [getList, name, stateList]);

	const errors = useValidateList(listRef, validators, field);

	if (isInsideForm && !field) {
		return null;
	}

	return React.createElement(component, {
		...componentProps,
		errors,
		list,
		listRef,
		name,
	});
};
