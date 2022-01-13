import React, {ButtonHTMLAttributes, useMemo} from 'react';

import {FormContext} from '~/@common/form-context';
import {FormContextState} from '~/@common/types';

export interface InternalSubmitButtonProps<T = HTMLButtonElement>
	extends ButtonHTMLAttributes<T> {
	isInvalid: boolean;
	isSubmitting: boolean;
}

interface SubmitButtonProps {
	component: any;
	componentProps: Record<string, any>;
	formState?: FormContextState;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
	component,
	componentProps,
	formState,
}) => {
	const fields = useMemo(() => formState?.fields, [formState]);
	const isInvalid = useMemo(() => {
		return fields ? Object.values(fields).some((el) => el.isInvalid) : false;
	}, [fields]);
	const isSubmitting = useMemo(() => formState?.isSubmitting, [formState]);

	return React.createElement(component, {
		...componentProps,
		isInvalid,
		isSubmitting,
		type: 'submit',
	});
};

export function createSubmitButton<T extends any = HTMLButtonElement>(
	component: (props: InternalSubmitButtonProps<T>) => JSX.Element,
): (
	props: Omit<InternalSubmitButtonProps, 'isInvalid' | 'isSubmitting' | 'type'>,
) => JSX.Element {
	return React.memo((props): JSX.Element => {
		return (
			<FormContext.Consumer>
				{(formState) => (
					<SubmitButton
						component={component}
						componentProps={props}
						formState={formState}
					/>
				)}
			</FormContext.Consumer>
		);
	});
}
