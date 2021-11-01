import React, {
	FormEvent,
	ReactNode,
	useCallback,
	useRef,
	useState,
} from 'react';

import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import set from 'lodash/set';

import {FormContext} from '~/@common/form-context';
import {FormContextState} from '~/@common/types';

export interface FormProps {
	children: ReactNode;
	defaultValues?: Record<string, any>;
	onSubmit: (values: unknown) => void;
}

/**
 * Компонент Form принимает children, defaultValues, onSubmit
 *
 * @component
 *
 * @typedef Form
 * @prop {React.ReactNode} [children] Childrens формы
 * @prop {React.ReactNode} [defaultValues] Дефолтные значения
 * @prop {func} [onSubmit] ...
 *
 * @example
 *import {Form} from '@altiore/form';
 * const Template: ComponentStory<typeof Form> = ({children, ...args}) => (
 *<Form {...args}>{children}</Form>
 *);
 * return (any)
 */

export const Form = ({
	children,
	defaultValues,
	onSubmit,
}: FormProps): JSX.Element => {
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
		(fieldName: string, isArray: boolean) => {
			setFields((s): FormContextState['fields'] => {
				const defaultValue = get(defaultValues, fieldName.split('.'));
				return {
					...s,
					[fieldName]: {
						defaultValue,
						errors: [],
						items: isArray ? [] : undefined,
						name: fieldName,
						setErrors: setErrors.bind({}, fieldName),
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
			formData.forEach((value: unknown, key: string) => {
				const keyArr = key.split('.');
				set(values, keyArr, value);
			});
			onSubmit(values);
		},
		[onSubmit],
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
