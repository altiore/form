export const remove = (
	list: number[],
	fieldName: string,
	index: number,
): number[] => {
	return list.filter((i) => i !== index);
};
