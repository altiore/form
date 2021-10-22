export const minLength =
	(length: number) =>
	(value: string | number): string | undefined => {
		const stringedValue = value.toString();
		if (length < 0) {
			return `Param 'length' cannot be less than 0`;
		}
		if (stringedValue.length < length) {
			return `The length of the entered value should be no less than ${stringedValue} characters`;
		}
		return undefined;
	};
