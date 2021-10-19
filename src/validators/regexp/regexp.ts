export const regexp =
	(regex: RegExp): ((value: string) => string | undefined) =>
	(value: string): string | undefined => {
		if (!regex.test(value)) {
			return `${value} does not fit the regular expression ${regex}`;
		}
		return undefined;
	};
