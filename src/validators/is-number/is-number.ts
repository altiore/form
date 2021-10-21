export const isNumber =
	() =>
	(value: string): undefined | string => {
		if (Number.isNaN(+value)) {
			return 'The value is not a number';
		}
		return undefined;
	};
