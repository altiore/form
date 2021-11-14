import {MutableRefObject, useEffect, useMemo, useRef, useState} from 'react';

export const useInput = <Input = HTMLInputElement>(
	name: string,
	formRef?: MutableRefObject<HTMLFormElement>,
): {customRef: MutableRefObject<Input>; inputRef: MutableRefObject<Input>} => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, [setMounted]);

	const customRef = useRef<Input>(null);

	const inputRef = useMemo<MutableRefObject<Input>>(() => {
		if (mounted && formRef?.current) {
			const input = formRef.current.querySelector(`[name="${name}"]`) as any;
			if (input) {
				return {
					current: input,
				} as MutableRefObject<Input>;
			}
		}

		return customRef;
	}, [customRef, formRef, mounted, name]);

	return {customRef, inputRef};
};
