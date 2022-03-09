import {
	MutableRefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import isEqual from 'lodash/isEqual';

import {useIsMounted} from '~/@common/hooks/use-is-mounted';
import {FieldMeta, FieldType, ValidateFuncType} from '~/@common/types';

import {getNodeByName} from './utils';

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
	isUntouched: boolean;
};

const DEF_ERRORS: string[] = [];

export const useValidateInput = <T extends HTMLElement = HTMLInputElement>(
	customRef: MutableRefObject<T>,
	validators: Array<ValidateFuncType>,
	formRef?: MutableRefObject<HTMLFormElement>,
	field?: FieldMeta,
	type?: FieldType,
	name?: string,
	hideErrorInXSec?: false | number,
): ValidateInputRes => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, [setMounted]);

	const getMounted = useIsMounted();

	const inputRef = useMemo<MutableRefObject<T>>(() => {
		const ERROR_MESSAGE =
			'Не удалось найти ссылку на инпут. Добавьте корректное имя вашему полю' +
			' input, или используйте inputRef';

		if (customRef.current) {
			return customRef;
		}

		if (mounted && field?.name) {
			const ref = getNodeByName<T>(field?.name, formRef);
			if (ref) {
				return ref;
			} else {
				throw new Error(ERROR_MESSAGE);
			}
		}

		if (mounted && name) {
			const ref = getNodeByName<T>(name);
			if (ref) {
				return ref;
			} else {
				throw new Error(ERROR_MESSAGE);
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

	const [errors, setErrors] = useState<string[]>(DEF_ERRORS);
	const [isUntouched, setIsUntouched] = useState<boolean>(true);

	const handleSetErrors = useCallback(
		(errors: string[]) => {
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
		[field?.setErrors, setErrors],
	);

	const setEmptyErrors = useCallback(() => {
		if (getMounted()) {
			handleSetErrors(DEF_ERRORS);
		}
	}, [getMounted, handleSetErrors]);

	const timeout = useRef<any>();
	const handleFieldChanged = useCallback(
		(e: Event) => {
			e.preventDefault();

			const errors: string[] = [];

			const hasValidation = Boolean(validators?.length && e.target);
			setIsUntouched(false);

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

			handleSetErrors(errors);
			if (hideErrorInXSec) {
				timeout.current = setTimeout(() => {
					setIsUntouched(true);
					setEmptyErrors();
				}, hideErrorInXSec);
			}
		},
		[
			handleSetErrors,
			setEmptyErrors,
			setIsUntouched,
			getFormValueByName,
			getMounted,
			field?.name,
			type,
			validators,
			hideErrorInXSec,
		],
	);

	const handleFocus = useCallback(
		(e: Event) => {
			e.preventDefault();

			setIsUntouched(false);
			setEmptyErrors();
		},
		[setIsUntouched, setEmptyErrors],
	);

	useEffect(() => {
		const input = inputRef.current;
		const hasEventHandler = Boolean(input);
		if (hasEventHandler) {
			input.addEventListener('blur', handleFieldChanged);
			input.addEventListener('focus', handleFocus);
		}

		return () => {
			if (hasEventHandler) {
				input.removeEventListener('blur', handleFieldChanged);
				input.removeEventListener('focus', handleFocus);
			}
		};
	}, [inputRef]);

	useEffect(() => {
		return () => {
			if (timeout.current) {
				clearTimeout(timeout.current);
			}
		};
	}, [timeout]);

	return {
		errors: field?.errors ?? errors,
		isUntouched: isUntouched,
		setErrors: field?.setErrors ?? setErrors,
	};
};
