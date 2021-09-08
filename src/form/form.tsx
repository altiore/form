// @ts-ignore
import React, {useCallback, useRef} from 'react';

export interface FormProps {
	children: any;
	onSubmit: (values: unknown) => void;
}

export const Form: React.FC<FormProps> = ({children, onSubmit}: FormProps) => {
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = useCallback(
		(evt: any) => {
			evt.preventDefault();
			const formData = new FormData(formRef.current ?? undefined);
			const values: any = {};
			formData.forEach((value: any, key: string) => (values[key] = value));
			onSubmit(values);
		},
		[onSubmit],
	);

	return (
		<form ref={formRef} onSubmit={handleSubmit}>
			{children}
		</form>
	);
};
