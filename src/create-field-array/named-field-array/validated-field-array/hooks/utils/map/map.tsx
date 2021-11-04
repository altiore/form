import React, {useCallback} from 'react';

import {FieldArrayContext} from '~/@common/field-array-context';
import {InsertPosition, ListItem} from '~/@common/types';

const Item = React.memo(({add, cb, fieldName, remove, name, index}: any) => {
	const removeHandler = useCallback(() => {
		remove(index);
	}, [index, remove]);

	const append = useCallback(
		(object: any) => {
			add(object, index, InsertPosition.AFTER);
		},
		[add, index],
	);

	const prepend = useCallback(
		(object: any) => {
			add(object, index, InsertPosition.BEFORE);
		},
		[add, fieldName, index],
	);

	return (
		<FieldArrayContext.Provider key={name} value={{name}}>
			{cb(
				{
					append,
					key: name,
					prepend,
					remove: removeHandler,
				},
				index,
			)}
		</FieldArrayContext.Provider>
	);
});

export const map = (
	add: (fieldState: Record<string, any>, index?: number) => void,
	remove: (index: number) => void,
	list: number[],
	fieldName: string,
	callback: (el: ListItem, index: number) => JSX.Element,
): JSX.Element[] => {
	return list.map((index) => {
		const name = `${fieldName}.${index}`;
		return (
			<Item
				key={name}
				add={add}
				cb={callback}
				remove={remove}
				name={name}
				fieldName={fieldName}
				index={index}
			/>
		);
	});
};
