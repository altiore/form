import React, {FormEvent, useCallback, useRef, useState} from 'react';

import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import set from 'lodash/set';
import unset from 'lodash/unset';

import {FormContext} from '~/@common/form-context';
import {FieldType, FormContextState} from '~/@common/types';

import {FormProps} from './types';

const parseBoolean = (value: string | undefined): any => value === 'on';
const parseNumber = (value: string): any => parseInt(value, 10);

const getValueByType = new Map([
	[FieldType.BOOLEAN, parseBoolean],
	[FieldType.NUMBER, parseNumber],
]);

/**
 * Форма - элемент взаимодействия пользователя с сайтом или приложением
 *
 * Простейший вариант формы выглядит следующим образом: мы используем элементы <input name="name"/> и <button type="submit">Submit</button>, предварительно импортировав ее из библиотеки <a href ='https://github.com/altiore/form'>@altiore/form</a>.
 */

export const Form = <Values extends Record<string, any> = Record<string, any>>({
	children,
	defaultValues,
	onSubmit,
}: FormProps<Values>): JSX.Element => {
	const formRef = useRef<HTMLFormElement>(null);
	const [fields, setFields] = useState<FormContextState['fields']>({});

	const setErrors = useCallback(
		(fieldName: string, errors: string[]) => {
			setFields((s) => {
				if (isEqual(s[fieldName].errors, errors)) {
					return s;
				}
				return {
					...s,
					[fieldName]: {
						...s[fieldName],
						errors,
					},
				};
			});
		},
		[setFields],
	);

	const setItems = useCallback(
		(fieldName: string, setItems: (i: number[]) => number[]) => {
			setFields((s) => ({
				...s,
				[fieldName]: {
					...s[fieldName],
					items: setItems(s[fieldName].items),
				},
			}));
		},
		[setFields],
	);

	const registerField = useCallback(
		(fieldName: string, fieldType: FieldType) => {
			setFields((s): FormContextState['fields'] => {
				const defaultValue = get(defaultValues, fieldName.split('.'));
				return {
					...s,
					[fieldName]: {
						defaultValue,
						errors: [],
						items: fieldType === FieldType.ARRAY ? [] : undefined,
						name: fieldName,
						setErrors: setErrors.bind({}, fieldName),
						type: fieldType,
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

	const handleSubmit = useCallback(
		(evt: FormEvent) => {
			evt.preventDefault();
			const formData = new FormData(formRef.current ?? undefined);
			const values: Record<string, unknown> = {};
			formData.forEach((value: unknown, name: string) => {
				set(values, name, value);
			});
			const resValues: Record<string, unknown> = cloneDeep(values);

			Object.keys(fields)
				.reverse()
				.forEach((fieldKey) => {
					const items = fields[fieldKey].items;
					const fieldType = fields[fieldKey].type;

					if (Array.isArray(items)) {
						const value = items.map((index: number) => {
							return (cloneDeep(get(resValues, fieldKey)) as any[])[index];
						});

						unset(resValues, fieldKey);
						set(resValues, fieldKey, value);
					} else {
						const prepareValue = getValueByType.get(fieldType);

						if (prepareValue) {
							const typedValue = prepareValue(get(resValues, fieldKey) as any);

							set(resValues, fieldKey, typedValue);
						}
					}
				});

			onSubmit(resValues as Values);
		},
		[fields, onSubmit],
	);

	return (
		<form onSubmit={handleSubmit} ref={formRef}>
			<FormContext.Provider
				value={{
					fields,
					formRef,
					registerField,
					setItems,
				}}>
				{children}
			</FormContext.Provider>
		</form>
	);
};
