export const getErrorMessage = <ForCheck>(
	value: unknown,
	forCheck: ForCheck,
	defaultError: string,
	getMessage:
		| null
		| undefined
		| string
		| ((value: any, forCheck: any) => string),
): string | undefined => {
	let error = defaultError;
	if (getMessage) {
		if (typeof getMessage === 'function') {
			error = getMessage(value, forCheck);
		} else {
			error = getMessage as string;
		}
	}
	if (forCheck !== undefined) {
		error = error.replace('$COMPARATOR', String(forCheck));
	}
	if (value !== undefined) {
		error = error.replace('$VALUE', String(value));
	}
	return error;
};
