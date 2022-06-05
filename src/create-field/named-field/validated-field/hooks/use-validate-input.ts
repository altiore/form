import {
	MutableRefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import isEqual from 'lodash/isEqual';

import {DEF_HIDE_ERROR_IN_X_SEC} from '~/@common/consts';
import {useIsMounted} from '~/@common/hooks/use-is-mounted';
import {FieldMeta, FieldType, ValidateFunc} from '~/@common/types';
import {
	formatValueByType,
	getNodeByName,
	getValueByNodeName,
	getValueByTypeAndTarget,
	warningsByType,
} from '~/@common/utils';

type ValidateInputRes = {
	errors: string[];
	setErrors: (errors: string[]) => void;
	warnings: string[];
};

const DEF_ERRORS: string[] = [];

export const useValidateInput = <T extends HTMLElement = HTMLInputElement>(
	customRef: MutableRefObject<T>,
	validators: Array<ValidateFunc>,
	formRef?: MutableRefObject<HTMLFormElement>,
	field?: FieldMeta,
	fieldType?: FieldType,
	nameFromProp?: string,
): ValidateInputRes => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, [setMounted]);

	const name = useMemo(
		() => field?.name || nameFromProp,
		[field?.name, nameFromProp],
	);

	const getMounted = useIsMounted();

	const inputRef = useMemo<MutableRefObject<T>>(() => {
		const ERROR_MESSAGE =
			`Не удалось найти ссылку на поле ввода "${name}". Добавьте корректное имя вашему полю` +
			' input, или используйте inputRef';

		if (customRef.current) {
			return customRef;
		}

		if (mounted && name) {
			const ref = getNodeByName<T>(name, formRef);
			if (ref) {
				return ref;
			} else {
				throw new Error(ERROR_MESSAGE);
			}
		}

		return {
			current: null,
		} as MutableRefObject<T>;
	}, [customRef, formRef, mounted, name]);

	const getFormValueByName = useCallback(
		(name: string) => {
			return getValueByNodeName(name, formRef);
		},
		[formRef],
	);

	const [errors, setErrorsState] = useState<string[]>(DEF_ERRORS);
	const [warnings, setWarningsState] = useState<string[]>(DEF_ERRORS);

	const setErrors = useCallback(
		(errors: string[], force?: boolean, isWarnings?: boolean) => {
			const handler = (s: string[]) => {
				if (isEqual(s, errors) && !force) {
					return s;
				}

				if (timeout.current) {
					clearTimeout(timeout.current);
				}

				timeout.current = setTimeout(() => {
					setErrorsState([]);
				}, DEF_HIDE_ERROR_IN_X_SEC);
				return errors;
			};
			if (isWarnings) {
				setWarningsState(handler);
			} else {
				setErrorsState(handler);
			}
		},
		[setErrorsState, setWarningsState],
	);

	const handleSetErrors = useCallback(
		(errors: string[], force?: boolean, isWarnings?: boolean) => {
			if (getMounted()) {
				if (field?.setErrors) {
					field.setErrors(errors, force, isWarnings);
				} else {
					setErrors(errors, force, isWarnings);
				}
			}
		},
		[getMounted, field?.setErrors, setErrors],
	);

	const timeout = useRef<any>();
	const handleFieldChanged = useCallback(
		(e: Event) => {
			e.preventDefault();

			const errors: string[] = [];

			const isMultiSelect =
				(e.target as any)?.tagName === 'SELECT' &&
				Boolean((e.target as any)?.multiple);
			if (isMultiSelect && fieldType !== FieldType.SELECT_MULTIPLE) {
				throw new Error(
					'Вы используете select со свойством multiple. Укажите' +
						' FieldType.SELECT_MULTIPLE явно для корректной работы элемента',
				);
			}

			const hasValidation = Boolean(validators?.length && e.target);
			if (hasValidation) {
				const value = getValueByTypeAndTarget(fieldType, e.target);

				validators.forEach((validate) => {
					const result = validate(value, name, getFormValueByName);
					if (result) {
						errors.push(result);
					}
				});
			}

			handleSetErrors(errors);
		},
		[
			getFormValueByName,
			getMounted,
			handleSetErrors,
			name,
			fieldType,
			validators,
		],
	);

	const handleFocus = useCallback(
		(e: Event) => {
			e.preventDefault();

			handleSetErrors([], true);
		},
		[handleSetErrors],
	);

	const checkWarnings = useCallback(
		(evt) => {
			const getWarnings = warningsByType.get(fieldType);
			const warnings = getWarnings(evt.target.value);
			handleSetErrors(warnings, false, true);
		},
		[fieldType, handleSetErrors],
	);

	const formatValue = useCallback(
		(evt) => {
			const formatter = formatValueByType.get(fieldType);
			evt.target.value = formatter(evt.target.value);
		},
		[fieldType],
	);

	useEffect(() => {
		const input = inputRef.current;
		const hasEventHandler = Boolean(input);
		if (hasEventHandler) {
			if (warningsByType.has(fieldType)) {
				input.addEventListener('keyup', checkWarnings);
			}
		}
		return () => {
			if (hasEventHandler) {
				if (warningsByType.has(fieldType)) {
					input.removeEventListener('keyup', checkWarnings);
				}
			}
		};
	}, [checkWarnings, inputRef, fieldType]);

	useEffect(() => {
		const input = inputRef.current;
		const hasEventHandler = Boolean(input);
		if (hasEventHandler) {
			if (formatValueByType.has(fieldType)) {
				input.addEventListener('keyup', formatValue);
			}
		}
		return () => {
			if (hasEventHandler) {
				if (formatValueByType.has(fieldType)) {
					input.removeEventListener('keyup', formatValue);
				}
			}
		};
	}, [inputRef, fieldType, formatValue]);

	useEffect(() => {
		const input = inputRef.current;
		const hasEventHandler = Boolean(input);

		const isChange =
			(hasEventHandler && input.tagName.toUpperCase() === 'SELECT') ||
			(input as any)?.type === 'checkbox';
		if (hasEventHandler) {
			if (isChange) {
				input.addEventListener('change', handleFieldChanged);
			}
			input.addEventListener('blur', handleFieldChanged);
			input.addEventListener('focus', handleFocus);
		}

		return () => {
			if (hasEventHandler) {
				if (isChange) {
					input.removeEventListener('change', handleFieldChanged);
				}
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
		setErrors: field?.setErrors ?? setErrors,
		warnings: field?.warnings ?? warnings,
	};
};
