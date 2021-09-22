import React, {FormEvent, useCallback, useRef} from 'react';

export interface FormProps {
	onSubmit: (values: unknown) => void;
}

export const Form: React.FC<FormProps> = ({children, onSubmit}) => {
	const formRef = useRef<HTMLFormElement>(null);

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
		<form ref={formRef} onSubmit={handleSubmit}>
			{children}
		</form>
	);
};
