import React, {
	FormEvent,
	ReactNode,
	useCallback,
	useRef,
	useState,
} from 'react';

import set from 'lodash/set';

import {FormContext} from '~/@common/form-context';
import {FormContextState} from '~/@common/types';
import {List} from '~/create-field-array/list';

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
		Omit<FormContextState, 'registerField'>
	>({
		defaultValues,
		errors: {},
		fields: {},
	});

	const registerField = useCallback(
		(fieldName: string, isArray?: boolean, prevList?: any) => {
			setFormState((s) => ({
				...s,
				fields: {
					...s.fields,
					[fieldName]: {
						list: isArray
							? new List(
									registerField,
									s.defaultValues?.[fieldName],
									fieldName,
									prevList,
							  )
							: undefined,
						registered: true,
					},
				},
			}));
		},
		[setFormState],
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
					registerField,
				}}>
				{children}
			</FormContext.Provider>
		</form>
	);
};
