import {FormEvent, FormHTMLAttributes, ReactNode} from 'react';

export interface FormProps<Values extends Record<string, any>>
	extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
	children: ReactNode;
	defaultValues?: Partial<Values>;
	onSubmit: (
		values: Partial<Values>,
		setErrors: (errors: Record<string, any>) => void,
		evt: FormEvent,
	) => Promise<any> | any;
}
