import {MutableRefObject, useRef} from 'react';

export const useInput = (
	name?: string,
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	formState?: any,
): MutableRefObject<HTMLInputElement> => {
	if (name && formState) {
		return useRef(
			formState.formRef.current.querySelector(`input[name=${name}]`),
		);
	}
	return useRef<HTMLInputElement>(null);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getInput = (name?: string, formState?: any): HTMLInputElement => {
	return formState.formRef.current.querySelector(`input[name=${name}]`);
};
