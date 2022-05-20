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
import {FieldMeta, FieldType, ValidateFunc} from '~/@common/types';
import {
	getNodeByName,
	getValueByNodeName,
	getValueByTypeAndTarget,
} from '~/@common/utils';

type ValidateInputRes = {
	errors: string[];
	setErrors: (errors: string[]) => void;
};

const DEF_ERRORS: string[] = [];

export const useValidateInput = <T extends HTMLElement = HTMLInputElement>(
	customRef: MutableRefObject<T>,
	validators: Array<ValidateFunc>,
	formRef?: MutableRefObject<HTMLFormElement>,
	field?: FieldMeta,
	type?: FieldType,
	nameFromProp?: string,
	hideErrorInXSec?: false | number,
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
			'Не удалось найти ссылку на инпут. Добавьте корректное имя вашему полю' +
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

	const [errors, setErrors] = useState<string[]>(DEF_ERRORS);

	const handleSetErrors = useCallback(
		(errors: string[], force?: boolean) => {
			if (field?.setErrors) {
				field.setErrors(errors, force);
			} else {
				setErrors((s) => {
					if (isEqual(s, errors) && !force) {
						return s;
					}
					return errors;
				});
			}
		},
		[field?.setErrors, setErrors],
	);

	const setEmptyErrors = useCallback(
		(force?: boolean) => {
			if (getMounted()) {
				handleSetErrors([], force);
			}
		},
		[getMounted, handleSetErrors],
	);

	const timeout = useRef<any>();
	const handleFieldChanged = useCallback(
		(e: Event) => {
			e.preventDefault();

			const errors: string[] = [];

			const isMultiSelect =
				(e.target as any)?.tagName === 'SELECT' &&
				Boolean((e.target as any)?.multiple);
			if (isMultiSelect && type !== FieldType.SELECT_MULTIPLE) {
				throw new Error(
					'Вы используете select со сойством multiple. Укажите' +
						' FieldType.SELECT_MULTIPLE явно для корректной работы элемента',
				);
			}

			const hasValidation = Boolean(validators?.length && e.target);
			if (hasValidation) {
				const value = getValueByTypeAndTarget(type, e.target);

				validators.forEach((validate) => {
					const result = validate(value, name, getFormValueByName);
					if (result) {
						errors.push(result);
					}
				});
			}

			handleSetErrors(errors);
			if (hideErrorInXSec) {
				timeout.current = setTimeout(setEmptyErrors, hideErrorInXSec);
			}
		},
		[
			handleSetErrors,
			setEmptyErrors,
			getFormValueByName,
			getMounted,
			name,
			type,
			validators,
			hideErrorInXSec,
		],
	);

	const handleFocus = useCallback(
		(e: Event) => {
			e.preventDefault();

			setEmptyErrors(true);
		},
		[setEmptyErrors],
	);

	useEffect(() => {
		const input = inputRef.current;
		const hasEventHandler = Boolean(input);
		if (hasEventHandler) {
			if (input.tagName.toUpperCase() === 'SELECT') {
				input.addEventListener('change', handleFieldChanged);
			}
			input.addEventListener('blur', handleFieldChanged);
			input.addEventListener('focus', handleFocus);
		}

		return () => {
			if (hasEventHandler) {
				if (input.tagName.toUpperCase() === 'SELECT') {
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
	};
};
