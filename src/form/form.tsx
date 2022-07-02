import React, {FormEvent, useCallback, useRef, useState} from 'react';

import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import set from 'lodash/set';
import unset from 'lodash/unset';

import {DEF_HIDE_ERROR_IN_X_SEC} from '~/@common/consts';
import {FormContext} from '~/@common/form-context';
import {
	FieldMeta,
	FieldType,
	FormContextState,
	ValidateFunc,
} from '~/@common/types';
import {getValueByNodeName, parseValueByType} from '~/@common/utils';

import {toFlatErrors} from './form.utils';
import {FormProps} from './types';

const getItemsFromDefVal = (_: any, i: number) => i;

const getArrayValue = (fieldName: string, values: any, items: number[]) => {
	return items.map((index: number) => {
		return (get(values, fieldName) as any[])[index];
	});
};

/**
 * Форма - элемент взаимодействия пользователя с сайтом или приложением
 */
export const Form = <Values extends Record<string, any> = Record<string, any>>({
	children,
	defaultValues,
	html5Validation,
	onSubmit,
	...props
}: FormProps<Values>): JSX.Element => {
	const formRef = useRef<HTMLFormElement>(null);
	const [fields, setFields] = useState<FormContextState['fields']>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const timeout = useRef<any>();

	const clearErrors = useCallback(() => {
		setFields((curFields) => {
			const newFields = {...curFields};
			let shouldUpdate = false;
			Object.entries(newFields).forEach(([curFieldName, curFieldVal]) => {
				if (curFieldVal.isInvalid) {
					shouldUpdate = true;
					newFields[curFieldName] = {
						...newFields[curFieldName],
						error: undefined,
						errors: [],
						isInvalid: false,
					};
				}
			});

			if (shouldUpdate) {
				return newFields;
			}

			return curFields;
		});
	}, [setFields]);

	const setErrors = useCallback(
		(
			fieldName: string,
			errors: string[],
			force?: boolean,
			isWarning?: boolean,
		) => {
			setFields((s) => {
				if (!s[fieldName]) {
					// этот код, похоже, никогда не выполняется и здесь лишь для совместимости
					return s;
				}

				let fieldData: FieldMeta;
				if (isWarning) {
					fieldData = {
						...s[fieldName],
						isUntouched: false,
						warning: errors?.[0],
						warnings: errors,
					};
				} else {
					fieldData = {
						...s[fieldName],
						error: errors?.[0],
						errors,
						isInvalid: Boolean(errors?.length),
						isUntouched: false,
					};
				}

				// улучает производительность, избегая рендера, если ошибки не изменились
				if (isEqual(s[fieldName], fieldData) && !force) {
					return s;
				}

				if (errors?.length) {
					if (timeout.current) {
						clearTimeout(timeout.current);
					}
					timeout.current = setTimeout(clearErrors, DEF_HIDE_ERROR_IN_X_SEC);
				}

				return {
					...s,
					[fieldName]: fieldData,
				};
			});
		},
		[clearErrors, setFields],
	);

	const setNestedErrors = useCallback(
		(errors: Record<string, any>) => {
			toFlatErrors(errors, setErrors);
		},
		[setErrors],
	);

	const setItems = useCallback(
		(
			fieldName: string,
			setItemsArg: (i: number[]) => number[],
			getErrors,
			defaultValue?: any,
		) => {
			setFields((s) => {
				const items = setItemsArg(s[fieldName].items);
				const errors = getErrors(items);
				return {
					...s,
					[fieldName]: {
						...s[fieldName],
						defaultValue,
						error: errors?.[0],
						errors,
						isInvalid: Boolean(errors?.length),
						isUntouched: false,
						items,
					},
				};
			});
		},
		[setFields],
	);

	const registerField = useCallback(
		(
			fieldName: string,
			fieldType: FieldType,
			fieldDefaultValue?: any,
			validators?: Array<ValidateFunc>,
		) => {
			setFields((s): FormContextState['fields'] => {
				const defaultValue = get(defaultValues, fieldName) ?? fieldDefaultValue;

				return {
					...s,
					[fieldName]: {
						defaultValue,
						error: undefined,
						errors: [],
						fieldType,
						isInvalid: false,
						// Этот флаг работает только для полей у которых есть валидаторы
						isUntouched: true,
						items:
							fieldType === FieldType.ARRAY
								? Array.isArray(defaultValue)
									? defaultValue.map(getItemsFromDefVal)
									: []
								: undefined,
						name: fieldName,
						setErrors: setErrors.bind({}, fieldName),
						validators: validators ? validators : [],
						warning: undefined,
						warnings: [],
					},
				};
			});

			return () => {
				setFields((s) => {
					const newState: any = {
						...s,
						[fieldName]: undefined,
					};
					delete newState[fieldName];
					return newState;
				});
			};
		},
		[defaultValues, setFields],
	);

	const getFormValueByName = useCallback(
		(name: string) => {
			if (!formRef) {
				throw new Error('Форма недоступна');
			}
			return getValueByNodeName(name, formRef);
		},
		[formRef],
	);

	const handleSubmit = useCallback(
		(formEventOrCustomHandler?: FormEvent) => {
			let evt: string | FormEvent = 'not a submit event';
			if (formEventOrCustomHandler?.preventDefault) {
				formEventOrCustomHandler.preventDefault();
				evt = formEventOrCustomHandler;
			}

			// 1. Преобразовываем данные в правильный формат
			const formData = new window.FormData(formRef.current ?? undefined);
			const values: Record<string, unknown> = {};

			formData.forEach((value: unknown, name: string) => {
				// Мы не можем проверить ошибки валидации внутри этого цикла, т.к. данные еще не
				// полностью сформированы (особенно для массивов)
				const fieldType = fields[name]?.fieldType;
				// находим функцию для преобразования данных к правильному формату,
				// если такая есть
				const prepareValue = parseValueByType.get(fieldType);

				const prevValue = get(values, name);
				if (prevValue) {
					// если предыдущее значение существует, значит это массив
					const newValue = Array.isArray(prevValue)
						? [...prevValue, value]
						: [prevValue, value];

					// если функция преобразования данных к правильному формату есть -
					// применяем ее
					set(values, name, prepareValue ? prepareValue(newValue) : newValue);
				} else {
					// если функция преобразования данных к правильному формату есть -
					// применяем ее
					set(values, name, prepareValue ? prepareValue(value) : value);
				}
			});

			// 2. Проверка данных на соответствие правилам валидации
			let isFormInvalid = false;
			Object.entries(fields).forEach(([fieldName, fieldMeta]: any) => {
				if (fieldMeta.validators) {
					const fieldType: FieldType = fieldMeta.fieldType || FieldType.TEXT;
					let value: any;
					if (fieldType === FieldType.ARRAY) {
						value = getArrayValue(fieldName, values, fieldMeta.items);
					} else {
						value = get(values, fieldName);
					}
					const errors: string[] = [];
					fieldMeta.validators.forEach((validate: ValidateFunc) => {
						const error = validate(value, fieldName, getFormValueByName);
						if (error) {
							isFormInvalid = true;
							errors.push(error);
						}
					});
					setErrors(fieldName, errors);
				}
			});

			if (isFormInvalid) {
				setIsSubmitting(false);
				return Promise.resolve();
			}

			Object.entries(fields).forEach(([fieldName, fieldMeta]: any) => {
				// Преобразовать массивы к массивам с непустыми данными
				// (должно быть в самом конце для правильной работы!)
				// мы не можем выполнить это действие во время проверки валидации,
				// т.к. не можем менять результирующие данные до их проверки
				// создание новой переменной с результирующими данными усложняет
				// понимание кода
				const items = fields[fieldName].items;
				if (Array.isArray(items)) {
					const value = getArrayValue(fieldName, values, fieldMeta.items);

					unset(values, fieldName);
					set(values, fieldName, value);
				}
			});

			setIsSubmitting(true);

			const localSubmitFunc =
				typeof formEventOrCustomHandler === 'function'
					? formEventOrCustomHandler
					: onSubmit;
			Promise.resolve(
				// если было событие submit, то передаем это событие как 3-ий параметр,
				// чтоб можно было что-то с ним сделать
				localSubmitFunc(values as Values, setNestedErrors, evt),
			)
				.then(function () {
					setIsSubmitting(false);
				})
				.catch(console.error);
		},
		[
			fields,
			getFormValueByName,
			onSubmit,
			setIsSubmitting,
			setErrors,
			setNestedErrors,
		],
	);

	return (
		<form
			{...props}
			onSubmit={handleSubmit}
			ref={formRef}
			noValidate={!html5Validation}>
			<FormContext.Provider
				value={{
					fields,
					formRef,
					isSubmitting,
					onSubmit: handleSubmit,
					registerField,
					setItems,
				}}>
				{children}
			</FormContext.Provider>
		</form>
	);
};
