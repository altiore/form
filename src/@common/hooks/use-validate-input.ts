import {MutableRefObject, useCallback, useEffect, useState} from 'react';

import _debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import {FieldMeta, ValidateFuncType} from '~/@common/types';

export const useValidateInput = (
	inputRef: MutableRefObject<HTMLInputElement>,
	validators: Array<ValidateFuncType>,
	field?: FieldMeta,
): string[] => {
	const [errors, setErrors] = useState<string[]>([]);

	const handleDebounceFn = useCallback(
		(e: Event) => {
			e.preventDefault();

			const hasValidation = Boolean(validators?.length && e.target);
			if (hasValidation) {
				const {value} = e.target as never;

				const errors: string[] = [];
				validators.forEach((validate) => {
					const {error} = validate.validate(value);
					if (error) {
						errors.push(error.message);
					}
				});
				if (field?.setErrors) {
					field.setErrors(errors);
				} else {
					setErrors((s) => {
						if (isEqual(s, errors)) {
							return s;
						}
						return errors;
					});
				}
			}
		},
		[field?.setErrors, setErrors, validators],
	);

	const debounceHandle = useCallback(_debounce(handleDebounceFn, 200), []);

	const handleBlur = useCallback(
		(e: Event) => {
			debounceHandle(e);
		},
		[debounceHandle],
	);

	useEffect(() => {
		const input = inputRef.current;
		const hasEventHandler = Boolean(validators?.length && input);
		if (hasEventHandler) {
			input.addEventListener('blur', handleBlur);
		}

		return () => {
			if (hasEventHandler) {
				input.removeEventListener('blur', handleBlur);
			}
		};
	}, [inputRef, validators]);

	return field?.errors ?? errors;
};
