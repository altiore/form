import React, {useRef} from 'react';

import {useList} from './hooks/use-list';
import {useValidateList} from './hooks/use-validate-list';
import {ValidatedFieldArrayProps} from './types/validated-field-array-props';

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