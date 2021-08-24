import React, {useCallback, useRef} from 'react';

export interface FormProps {
	onSubmit: (values: unknown) => void;
}

export const Form: React.FC<FormProps> = ({children, onSubmit}) => {
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = useCallback(
		(evt) => {
			evt.preventDefault();
			const formData = new FormData(formRef.current ?? undefined);
			const values = {};
			formData.forEach((value, key) => (values[key] = value));
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
