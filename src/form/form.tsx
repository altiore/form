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
import {FieldMeta, FormContextState, ListInterface} from '~/@common/types';
import {add, map, remove} from '~/create-array-field/array-field.utils';

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
	const [formState, setFormState] = useState<
		Omit<FormContextState, 'registerField' | 'getList' | 'formRef'>
	>({
		fields: {},
	});

	const setErrors = useCallback(
		(fieldName: string, errors: string[]) => {
			setFormState((s) => {
				if (isEqual(s.fields[fieldName].errors, errors)) {
					return s;
				}
				return {
					...s,
					fields: {
						...s.fields,
						[fieldName]: {
							...s.fields[fieldName],
							errors,
						},
					},
				};
			});
		},
		[setFormState],
	);

	const setItems = useCallback(
		(fieldName: string, setItems: (i: number[]) => number[]) => {
			setFormState((s) => ({
				...s,
				fields: {
					...s.fields,
					[fieldName]: {
						...s.fields[fieldName],
						items: setItems(s.fields[fieldName].items),
					},
				},
			}));
		},
		[setFormState],
	);

	const getList = useCallback(
		(fieldMeta: FieldMeta): ListInterface => {
			const fieldName = fieldMeta.name;
			const addHandler = (field: any, index?: number) =>
				setItems(fieldName, (i) => {
					return add(i, fieldName, field, index);
				});
			const removeHandler = (index: number) =>
				setItems(fieldName, (i) => {
					const res = remove(i, fieldName, index);
					return res;
				});
			const items = fieldMeta.items || [];
			const mapHandler = map.bind(
				{},
				addHandler,
				removeHandler,
				items,
				fieldName,
			);
			return {
				add: addHandler,
				map: mapHandler,
				remove: removeHandler,
			};
		},
		[setItems],
	);

	const registerField = useCallback(
		(fieldName: string, isArray: boolean) => {
			setFormState((s) => {
				const defaultValue = get(defaultValues, fieldName.split('.'));
				return {
					...s,
					fields: {
						...s.fields,
						[fieldName]: {
							defaultValue,
							errors: [],
							items: isArray ? [] : undefined,
							name: fieldName,
							setErrors: setErrors.bind({}, fieldName),
						},
					},
				};
			});

			return () => {
				setFormState((s) => {
					const newState: any = {
						...s,
						fields: {
							...s.fields,
							[fieldName]: undefined,
						},
					};
					delete newState.fields[fieldName];
					return newState;
				});
			};
		},
		[defaultValues, setFormState],
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
					...formState,
					formRef,
					getList,
					registerField,
				}}>
				{children}
			</FormContext.Provider>
		</form>
	);
};
