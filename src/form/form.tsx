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
import {getValueByNodeName} from '~/@common/utils';

import {getArrayValue, getFormValues, toFlatErrors} from './form.utils';
import {FormProps} from './types';

const getItemsFromDefVal = (_: any, i: number) => i;

/**
 * Форма - элемент взаимодействия пользователя с сайтом или приложением
 */
export const Form = <Values extends Record<string, any> = Record<string, any>>({
	children,
	defaultValues,
	hideErrorsInXSeconds = DEF_HIDE_ERROR_IN_X_SEC,
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
					if (typeof hideErrorsInXSeconds === 'number') {
						timeout.current = setTimeout(
							clearErrors,
							hideErrorsInXSeconds * 1000,
						);
					}
				}

				return {
					...s,
					[fieldName]: fieldData,
				};
			});
		},
		[clearErrors, hideErrorsInXSeconds, setFields],
	);

	const setNestedErrors = useCallback(
		(errors: Record<string, any>) => {
			toFlatErrors(errors, setErrors);
		},
		[setErrors],
	);

	// К сожалению, нормализация индексов не работает, т.к. механизмы React конфликтуют с изменениями сырого кода
	// const normalizeItems = useCallback(
	// 	(
	// 		fieldPattern: string,
	// 		s: Record<string, FieldMeta>,
	// 		fixedItems: Array<number>,
	// 	) => {
	// 		if (Array.isArray(s[fieldPattern].items)) {
	// 			let newState = s;
	// 			const it_len = fixedItems.length;
	// 			for (let i = 0; i < it_len; i++) {
	// 				Object.entries(s).forEach(([oldFieldName, fieldMeta]) => {
	// 					const matched = oldFieldName.match(
	// 						new RegExp(`^${fieldPattern}\.${fixedItems[i]}\.(.+)`),
	// 					);
	// 					if (fixedItems[i] !== i && matched && document) {
	// 						const newFieldName = `${fieldPattern}.${i}.${matched[1]}`;
	//
	// 						const elemOld = document.querySelector(
	// 							`[name="${oldFieldName}"]`,
	// 						);
	// 						const elemNew = document.querySelector(
	// 							`[name="${newFieldName}"]`,
	// 						);
	//
	// 						if (elemOld && matched[1]) {
	// 							elemOld.setAttribute('name', newFieldName);
	// 							delete newState[oldFieldName];
	// 							newState = {
	// 								...newState,
	// 								[newFieldName]: fieldMeta,
	// 							};
	//
	// 							// TODO: точно непонятно, почему это работает
	// 							//		Вероятно, это связано с тем, как работают ключи React
	// 							// 		Пока этот код срабатывал всегда, но это не значит, что это будет действительно всегда работать
	// 							//		Возможно, для очень больших форм этот код может создавать ухудшение производительности
	// 							if (elemNew && matched[1]) {
	// 								(elemNew as any).value = (elemOld as any).value;
	// 							}
	// 						}
	// 					}
	// 				});
	// 			}
	//
	// 			return newState;
	// 		}
	// 		return s;
	// 	},
	// 	[],
	// );

	const setItems = useCallback(
		(
			fieldName: string,
			setItemsArg: (i: number[]) => number[],
			getErrors: any,
			defaultValue?: any,
		) => {
			setFields((s) => {
				const itemsPrev = [...s[fieldName].items];
				const items = setItemsArg(s[fieldName].items);
				const errors = getErrors(items);

				const newState = {
					...s,
					[fieldName]: {
						...s[fieldName],
						defaultValue,
						error: errors?.[0],
						errors,
						isInvalid: Boolean(errors?.length),
						isUntouched: false,
						items,
						itemsPrev,
					},
				};

				// Если происходит удаление элемента массива, то нужно отфильтровать все неиспользуемые поля
				if (itemsPrev.length > items.length) {
					const removedItems = itemsPrev.filter((el) => !items.includes(el));
					const allRemovedFields = Object.keys(newState).filter((fieldName) => {
						removedItems.some((removedItem) => {
							return fieldName.match(
								new RegExp(`^${fieldName}\.${removedItem}\.(.+)`),
							);
						});
					});
					allRemovedFields.forEach((removedField) => {
						delete newState[removedField];
					});
				}
				// К сожалению, нормализация индексов не работает, т.к. механизмы React конфликтуют с изменениями сырого кода
				// if (itemsPrev.length !== items.length) {
				// 	return {
				// 		...normalizeItems(fieldName, s, items),
				// 		[fieldName]: {
				// 			...s[fieldName],
				// 			defaultValue,
				// 			error: errors?.[0],
				// 			errors,
				// 			isInvalid: Boolean(errors?.length),
				// 			isUntouched: false,
				// 			items: Array.from({length: items.length}, (_, index) => index),
				// 			itemsPrev,
				// 		},
				// 	};
				// }

				return newState;
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

				const items =
					fieldType === FieldType.ARRAY
						? Array.isArray(defaultValue)
							? defaultValue.map(getItemsFromDefVal)
							: []
						: undefined;
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
						items,
						itemsPrev: items,
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
			const values = getFormValues(formRef.current, fields);

			// 2. Проверка данных на соответствие правилам валидации
			let isFormInvalid = false;
			Object.entries(fields).forEach(
				([fieldName, fieldMeta]: [string, FieldMeta]) => {
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
				},
			);

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
			noValidate={!html5Validation}
			{...props}
			onSubmit={handleSubmit}
			ref={formRef}>
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
