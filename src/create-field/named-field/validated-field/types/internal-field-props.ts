import {MutableRefObject} from 'react';

export type InternalFieldProps<T = HTMLInputElement> = {
	inputRef: MutableRefObject<T>;
};
