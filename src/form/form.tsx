import React, {FormEvent, ReactNode, useCallback, useMemo, useRef} from 'react';

import {FormContext} from '~/@common/form-context';

export interface FormProps {
	children: ReactNode;
	defaultValues?: Record<string, any>;
	onSubmit: (values: unknown) => void;
}

export const Form = ({
	children,
	defaultValues,
	onSubmit,
}: FormProps): JSX.Element => {
	const formRef = useRef<HTMLFormElement>(null);

	const formState = useMemo(
		() => ({
			defaultValues,
			errors: {},
		}),
		[defaultValues],
	);

	const handleSubmit = useCallback(
		(evt: FormEvent) => {
			evt.preventDefault();
			const formData = new FormData(formRef.current ?? undefined);
			const values: Record<string, unknown> = {};
			formData.forEach((value: unknown, key: string) => (values[key] = value));
			onSubmit(values);
		},
		[onSubmit],
	);

	return (
		<form onSubmit={handleSubmit} ref={formRef}>
			<FormContext.Provider value={formState}>{children}</FormContext.Provider>
		</form>
	);
};
