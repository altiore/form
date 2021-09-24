import React, {useCallback, useEffect, useState} from 'react';

import _debounce from 'lodash/debounce';

export interface FieldMeta {
	valid: boolean;
	error?: string;
}

export interface InputProps {
	name: string;
	meta: FieldMeta;
}

export interface FieldProps {
	name: string;
	component?: React.ComponentType<InputProps>;
	validate?: (value: unknown) => string | undefined;
}

export const Field: React.FC<FieldProps> = ({
	name,
	component: Input,
	validate,
	...props
}) => {
	const [meta, setMeta] = useState<FieldMeta>({
		valid: true,
	});

	const handleDebounceFn = useCallback((e: Event) => {
		e.preventDefault();

		if (e.target) {
			const {value} = e.target as never;
			const validationError =
				typeof validate === 'function' ? validate(value) : undefined;

			setMeta({
				error: validationError,
				valid: validationError === undefined,
			});
		}
	}, []);

	const debounceHandle = useCallback(_debounce(handleDebounceFn, 1500), []);

	const handleKeyUp = useCallback(
		(e: Event) => {
			debounceHandle(e);
		},
		[debounceHandle],
	);

	useEffect(() => {
		const input = document.querySelector(`input[name=${name}]`);

		if (input) {
			input.addEventListener('keyup', handleKeyUp);
		} else {
			throw new Error(`Input c name=${name} не был найден`);
		}

		return () => {
			if (input) {
				input.removeEventListener('keyup', handleKeyUp);
			}
		};
	}, []);

	return (
		<>{Input ? <Input name={name} meta={meta} {...props}/> : <input name={name} />}</>
	);
};
