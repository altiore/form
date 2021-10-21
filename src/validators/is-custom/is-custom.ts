export const isCustom =
	<T>(
		isFunc: (value: T | string) => boolean,
		errorMessage: string,
		prepareValue?: (value: string) => T,
	) =>
	(value: string): string | undefined => {
		let preparedValue: T | string = value;
		if (prepareValue) {
			preparedValue = prepareValue(value);
		}
		if (!isFunc(preparedValue)) {
			return errorMessage
				.replace(new RegExp(':value:'), value)
				.replace(new RegExp(':prepared:'), preparedValue.toString());
		}
	};
