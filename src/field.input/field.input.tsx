import React, {useCallback, useEffect, useRef, useState} from 'react';

import _debounce from 'lodash/debounce';

export const createField = (component: React.Component<any>) => (props) => {
	const {name, validators} = props;

	const element = useRef<HTMLInputElement | null>(null);
	const [errors, setErrors] = useState<string[]>([]);

	const handleDebounceFn = useCallback((e: Event) => {
		e.preventDefault();

		if (e.target) {
			const {value} = e.target as never;

			const arrErrors: string[] = [];

			validators.forEach((validator) => {
				const error = validator(value);
				if (error) {
					arrErrors.push(error);
				}
			});
			setErrors(arrErrors);
		}
	}, []);

	const debounceHandle = useCallback(_debounce(handleDebounceFn, 200), []);

	const handleBlur = useCallback(
		(e: Event) => {
			debounceHandle(e);
		},
		[debounceHandle],
	);

	 useEffect(() => {
		const input = element.current.querySelector(`input[name=${name}]`);

		if (input) {
			input.addEventListener('blur', handleBlur);
		} else {
			throw new Error(`Input c name=${name} не был найден`);
		}

		return () => {
			if (input) {
				input.removeEventListener('blur', handleBlur);
			}
		};
	}, []);

	console.log(errors)

	const Input: any = component;
	return (
		<div ref={element}>
			<Input errors={errors} {...props} />
		</div>
	)
}
