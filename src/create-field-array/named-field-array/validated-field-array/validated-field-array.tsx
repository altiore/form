import React, {useMemo, useRef} from 'react';

import {useList} from './hooks/use-list';
import {ValidatedFieldArrayProps} from './types/validated-field-array-props';

export const ValidatedFieldArray = <T,>({
	component,
	componentProps,
	field: fieldMeta,
	name,
	setItems,
	validators,
}: ValidatedFieldArrayProps<T>): JSX.Element => {
	const listRef = useRef<HTMLElement>(null);
	const [list, errors] = useList(name, validators, fieldMeta, setItems);

	return useMemo(
		() =>
			React.createElement(component, {
				...componentProps,
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
