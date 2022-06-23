const AllowedCountries = new Map([
	['en', '+1'],
	['ru', '+7 '],
	['uk', '+38 '],
]);

export const getCountryCode = (): string => {
	if (typeof navigator !== 'undefined' && navigator && navigator.language) {
		if (AllowedCountries.has(navigator.language)) {
			return AllowedCountries.get(navigator.language);
		}
	}

	return '+7 ';
};
