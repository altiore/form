export const toFlatErrors = (
	errors: Record<string, any>,
	setErrors: (fieldName: string, errors: string[]) => void,
): void => {
	Object.keys(errors).forEach((namePart) => {
		const v = errors[namePart];
		if (Array.isArray(v) && typeof v[0] === 'string') {
			setErrors(namePart, v);
		} else {
			const newObj = Object.entries(v).reduce<Record<string, any>>(
				(r, [name, value]) => {
					r[`${namePart}.${name}`] = value;
					return r;
				},
				{},
			);
			toFlatErrors(newObj, setErrors);
		}
	});
};
