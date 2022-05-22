export const toFlatErrors = (
	errors: Record<string, any>,
	setErrors: (fieldName: string, errors: string[]) => void,
	prefix = '',
): void => {
	Object.entries(errors).forEach(([namePart, errorField]) => {
		const name = (prefix ? `${prefix}.` : '') + namePart;
		if (
			(Array.isArray(errorField) && typeof errorField[0] === 'string') ||
			typeof errorField === 'string'
		) {
			setErrors(
				name,
				typeof errorField === 'string' ? [errorField] : errorField,
			);
		} else {
			toFlatErrors(errorField, setErrors, name);
		}
	});
};
