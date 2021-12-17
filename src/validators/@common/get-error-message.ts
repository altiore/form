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
	return error;
};
