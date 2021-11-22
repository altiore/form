import React, {useCallback} from 'react';

import {FieldArrayContext} from '~/@common/field-array-context';
import {InsertPosition, ListItem} from '~/@common/types';

interface ItemProps {
	add: (
		fieldState: Record<string, any>,
		index?: number,
		offset?: InsertPosition,
	) => void;
	cb: (el: ListItem, index: number) => JSX.Element;
	fieldName: string;
	remove: (index: number) => void;
	name: string;
	index: number;
}

const Item = React.memo<ItemProps>(
	({add, cb, fieldName, remove, name, index}) => {
		const removeHandler = useCallback(() => {
			remove(index);
		}, [index, remove]);

		const append = useCallback(
			(initialValue?: any) => {
				add(initialValue, index, InsertPosition.AFTER);
			},
			[add, index],
		);

		const prepend = useCallback(
			(initialValue?: any) => {
				add(initialValue, index, InsertPosition.BEFORE);
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
	},
);

export const map = (
	add: (
		fieldState: Record<string, any>,
		index?: number,
		offset?: InsertPosition,
	) => void,
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
