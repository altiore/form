import {InsertPosition} from '~/@common/types';

export const add = (
	list: number[],
	fieldName: string,
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	fieldState: any,
	index?: number,
	offset?: InsertPosition,
): number[] => {
	// const fieldDefaultValue =
	// 	typeof fieldState.persist === 'function' ? undefined : fieldState;
	// TODO: добавить fieldDefaultValue значение в дефолтные значения

	const lastElement = Math.max(...list);

	if (typeof index === 'number') {
		const baseListItemIndex = list.indexOf(index);
		return [
			...list.slice(0, baseListItemIndex + offset ?? InsertPosition.AFTER),
			lastElement + 1,
			...list.slice(baseListItemIndex + offset ?? InsertPosition.AFTER),
		];
	}

	return [...list, list.length ? lastElement + 1 : 0];
};
