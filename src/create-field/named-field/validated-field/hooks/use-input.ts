import {MutableRefObject, useRef} from 'react';

export const useInput = (): MutableRefObject<HTMLInputElement> => {
	return useRef<HTMLInputElement>(null);
};
