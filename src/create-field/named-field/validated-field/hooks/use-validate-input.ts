import {MutableRefObject, useCallback, useEffect, useState} from 'react';

import _debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import {FieldMeta, ValidateFuncType} from '~/@common/types';

type ValidateInputRes = {
	errors: string[];
	setErrors: (errors: string[]) => void;
};

export const useValidateInput = (
	inputRef: MutableRefObject<HTMLInputElement>,
	validators: Array<ValidateFuncType>,
	field?: FieldMeta,
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	formState?: any,
): ValidateInputRes => {
	const [errors, setErrors] = useState<string[]>([]);

	const handleDebounceFn = useCallback(
		(e: Event) => {
			e.preventDefault();

			const hasValidation = Boolean(validators?.length && e.target);
			if (hasValidation) {
				const {value} = e.target as never;

				const errors: string[] = [];
				validators.forEach((validate) => {
					const result = validate.validate(value, formState);
					if (result?.error) {
						errors.push(result.error.message);
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

	return {
		errors: field?.errors ?? errors,
		setErrors: field?.setErrors ?? setErrors,
	};
};
