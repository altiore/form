import {
	MutableRefObject,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

import isEqual from 'lodash/isEqual';

import {FieldMeta, FieldType, ValidateFuncType} from '~/@common/types';

const getValue = (evt: Event) => (evt.target as any).value;
const getChecked = (evt: Event) => (evt.target as any).checked;

const getValueByType = new Map<FieldType, (evt: Event) => any>([
	[FieldType.BOOLEAN, getChecked],
	[FieldType.NUMBER, getValue],
	[FieldType.TEXT, getValue],
]);

const getNodeByName = <T>(
	name: string,
	formRef?: MutableRefObject<HTMLFormElement>,
): null | MutableRefObject<T> => {
	if (formRef?.current) {
		const input = formRef.current.querySelector(`[name="${name}"]`) as any;
		if (input) {
			return {
				current: input,
			} as MutableRefObject<T>;
		}
	} else {
		const input = document.querySelector(`[name="${name}"]`) as any;
		if (input) {
			return {
				current: input,
			} as MutableRefObject<T>;
		}
	}

	return null;
};

type ValidateInputRes = {
	errors: string[];
	setErrors: (errors: string[]) => void;
};

export const useValidateInput = <T extends HTMLElement = HTMLInputElement>(
	customRef: MutableRefObject<T>,
	validators: Array<ValidateFuncType>,
	formRef?: MutableRefObject<HTMLFormElement>,
	field?: FieldMeta,
	type?: FieldType,
): ValidateInputRes => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, [setMounted]);

	const inputRef = useMemo<MutableRefObject<T>>(() => {
		if (customRef.current) {
			return customRef;
		}

		if (mounted && field?.name) {
			const ref = getNodeByName<T>(field?.name, formRef);
			if (ref) {
				return ref;
			} else {
				throw new Error(
					'Не удалось найти ссылку на инпут. Добавьте корректное имя вашему полю' +
						' input, или используйте inputRef',
				);
			}
		}

		return {
			current: null,
		} as MutableRefObject<T>;
	}, [customRef, formRef, mounted, field?.name]);

	const getFormValueByName = useCallback(
		(name: string) => {
			const fountInputRef = getNodeByName<any>(name, formRef);
			if (fountInputRef) {
				return fountInputRef.current.type === 'checkbox'
					? fountInputRef.current.checked
					: fountInputRef.current.value;
			}

			return null;
		},
		[formRef],
	);

	const [errors, setErrors] = useState<string[]>([]);

	const handleFieldChanged = useCallback(
		(e: Event) => {
			e.preventDefault();

			const errors: string[] = [];

			const hasValidation = Boolean(validators?.length && e.target);
			if (hasValidation) {
				const getCurrentValue = getValueByType.get(type) ?? getValue;
				const value = getCurrentValue(e);

				validators.forEach((validate) => {
					const result = validate(value, field?.name, getFormValueByName);
					if (result) {
						errors.push(result);
					}
				});
			}

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
		},
		[
			getFormValueByName,
			field?.setErrors,
			field?.name,
			setErrors,
			type,
			validators,
		],
	);

	const handleFocus = useCallback(
		(e: Event) => {
			e.preventDefault();

			if (field?.setErrors) {
				field.setErrors([]);
			} else {
				setErrors((s) => {
					if (isEqual(s, [])) {
						return s;
					}
					return [];
				});
			}
		},
		[field?.setErrors, setErrors],
	);

	useEffect(() => {
		const input = inputRef.current;
		const hasEventHandler = Boolean(input);
		if (hasEventHandler) {
			if (type === FieldType.SELECT) {
				// TODO: нужно обработать случай, когда селект является селектом
				input.addEventListener('change', handleFieldChanged);
			} else {
				input.addEventListener('blur', handleFieldChanged);
				input.addEventListener('focus', handleFocus);
			}
		}

		return () => {
			if (hasEventHandler) {
				if (type === FieldType.SELECT) {
					// TODO: нужно обработать случай, когда селект является селектом
					input.removeEventListener('change', handleFieldChanged);
				} else {
					input.removeEventListener('blur', handleFieldChanged);
					input.removeEventListener('focus', handleFocus);
				}
			}
		};
	}, [inputRef, type]);

	return {
		errors: field?.errors ?? errors,
		setErrors: field?.setErrors ?? setErrors,
	};
};
