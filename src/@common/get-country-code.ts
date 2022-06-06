const AllowedCountries = new Map([
	['ru', '+7 '],
	['uk', '+38 '],
]);

export const getCountryCode = (): string => {
	if (navigator && navigator.language) {
		if (AllowedCountries.has(navigator.language)) {
			return AllowedCountries.get(navigator.language);
		}
	}

	return '+7 ';
};
