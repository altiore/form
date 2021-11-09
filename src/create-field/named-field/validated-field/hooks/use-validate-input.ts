import {MutableRefObject, useCallback, useEffect, useState} from 'react';

import _debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import {FieldMeta, FieldType, ValidateFuncType} from '~/@common/types';

const getValue = (evt: Event) => (evt.target as any).value;
const getChecked = (evt: Event) => (evt.target as any).checked;

const getValueByType = new Map<FieldType, (evt: Event) => any>([
	[FieldType.BOOLEAN, getChecked],
	[FieldType.NUMBER, getValue],
	[FieldType.TEXT, getValue],
]);

type ValidateInputRes = {
	errors: string[];
	setErrors: (errors: string[]) => void;
};

export const useValidateInput = (
	inputRef: MutableRefObject<HTMLInputElement>,
	validators: Array<ValidateFuncType>,
	field?: FieldMeta,
	type?: FieldType,
): ValidateInputRes => {
	const [errors, setErrors] = useState<string[]>([]);

	const handleDebounceFn = useCallback(
		(e: Event) => {
			e.preventDefault();

			const hasValidation = Boolean(validators?.length && e.target);
			if (hasValidation) {
				const getCurrentValue = getValueByType.get(type) ?? getValue;
				const value = getCurrentValue(e);

				const errors: string[] = [];
				validators.forEach((validate) => {
					const result = validate.validate(value);
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
		[field?.setErrors, setErrors, type, validators],
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
