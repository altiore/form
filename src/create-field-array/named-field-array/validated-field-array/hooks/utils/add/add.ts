import {InsertPosition} from '~/@common/types';

export const add = (
	list: number[],
	fieldName: string,
	index?: number,
	offset?: InsertPosition,
): number[] => {
	const newElement = list.length ? Math.max(...list) + 1 : 0;

	if (typeof index === 'number') {
		const baseListItemIndex = list.indexOf(index);
		return [
			...list.slice(0, baseListItemIndex + offset ?? InsertPosition.AFTER),
			newElement,
			...list.slice(baseListItemIndex + offset ?? InsertPosition.AFTER),
		];
	}

	return [...list, newElement];
};
