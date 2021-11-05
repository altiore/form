import {ReactNode} from 'react';

export interface FormProps<Values extends Record<string, any>> {
	children: ReactNode;
	defaultValues?: Partial<Values>;
	onSubmit: (values: Partial<Values>) => void;
}
