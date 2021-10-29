import React, {MutableRefObject, useRef} from 'react';

import {FieldMeta, ListInterface, ValidateFuncType} from '~/@common/types';
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
	name: string;
	validators: Array<ValidateFuncType>;
}

export const ValidatedArrayField = <T,>({
	component,
	componentProps,
	field,
	name,
	validators,
}: ValidatedArrayFieldProps<T>): JSX.Element => {
	const listRef = useRef<HTMLElement>(null);

	const list = useList(name, field);

	const errors = useValidateList(listRef, validators, field);

	return React.createElement(component, {
		...componentProps,
		errors,
		list,
		listRef,
		name,
	});
};
