import {FormEvent, FormHTMLAttributes, ReactNode} from 'react';

export interface FormProps<Values extends Record<string, any>>
	extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
	hideErrorsInXSeconds?: false | number;
	children: ReactNode;
	defaultValues?: Partial<Values>;
	html5Validation?: boolean;
	onSubmit: (
		values: Partial<Values>,
		setErrors: (errors: Record<string, any>) => void,
		evt: FormEvent | string,
	) => Promise<any> | any;
	setState?: (updateFunc: (values: Partial<Values>) => Partial<Values>) => void;
}
