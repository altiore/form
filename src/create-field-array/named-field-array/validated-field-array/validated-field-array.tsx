import React, {useEffect, useMemo, useRef} from 'react';

import intersection from 'lodash/intersection';

import {forbiddenPropsError} from '~/@common/errors';
import {
	FieldArrayProps,
	FieldMeta,
	FieldMetaName,
	ValidateFunc,
} from '~/@common/types';

import {useList} from './hooks/use-list';

export interface ValidatedFieldArrayProps<
	CustomFieldProps extends Record<string, any> = Record<string, any>,
	ArrayItemProps extends Record<string, any> = Record<string, any>,
> {
	component: (
		props: FieldArrayProps<CustomFieldProps, ArrayItemProps>,
	) => JSX.Element;
	componentProps: CustomFieldProps;
	field: FieldMeta;
	name: string;
	setItems: (
		fieldName: string,
		setItems: (i: number[]) => number[],
		setErrors: (i: number[]) => string[],
		defValue?: any,
	) => void;
	validators: Array<ValidateFunc>;
}

export const ValidatedFieldArray = <
	CustomFieldProps extends Record<string, any> = Record<string, any>,
	ArrayItemProps extends Record<string, any> = Record<string, any>,
>({
	component,
	componentProps,
	field: fieldMeta,
	name,
	setItems,
	validators,
}: ValidatedFieldArrayProps<CustomFieldProps, ArrayItemProps>): JSX.Element => {
	const listRef = useRef<HTMLElement>(null);
	const [list, errors] = useList<ArrayItemProps>(
		name,
		validators,
		fieldMeta,
		setItems,
	);

	useEffect(() => {
		const forbiddenProps = intersection(Object.keys(componentProps), [
			...Object.values(FieldMetaName),
			'list',
			'listRef',
		]);
		forbiddenPropsError(forbiddenProps, name);
	}, [componentProps, name]);

	return useMemo(
		() =>
			React.createElement(component, {
				...componentProps,
				...(fieldMeta || ({} as any)),
				error: errors?.[0],
				errors: errors || [],
				isInvalid: Boolean(errors?.length),
				list,
				listRef,
				name,
			}),
		[componentProps, errors, list, listRef, name],
	);
};
