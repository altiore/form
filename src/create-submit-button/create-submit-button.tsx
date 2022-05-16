import React, {ButtonHTMLAttributes, useCallback, useMemo} from 'react';

import omit from 'lodash/omit';

import {FormContext} from '~/@common/form-context';
import {FormContextState} from '~/@common/types';

export interface InternalSubmitButtonProps<T = HTMLButtonElement>
	extends ButtonHTMLAttributes<T> {
	isInvalid: boolean;
	isSubmitting: boolean;
	isUntouched: boolean;
	onSubmit?: (values: any) => Promise<any>;
}

interface SubmitButtonProps {
	component: any;
	componentProps: Record<string, any>;
	formState?: FormContextState;
}

const getIsInvalid = (fields: FormContextState['fields']) =>
	fields ? Object.values(fields).some((el) => el.isInvalid) : false;

const dispatchEvent = (element: HTMLElement) => {
	if (element.dispatchEvent && window.MouseEvent) {
		element.dispatchEvent(
			new window.MouseEvent('blur', {bubbles: true, cancelable: true}),
		);
	} else {
		(element as any).fireEvent(`onblur`);
	}
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
	component,
	componentProps,
	formState,
}) => {
	const fields = useMemo(() => formState?.fields, [formState]);
	const isInvalid = useMemo(() => {
		return getIsInvalid(fields);
	}, [fields]);
	const isSubmitting = useMemo(() => formState?.isSubmitting, [formState]);
	const isUntouched = useMemo(() => {
		return fields ? Object.values(fields).every((el) => el.isUntouched) : false;
	}, [fields]);

	const onClick = useCallback(
		(evt) => {
			evt.preventDefault();
			evt.stopPropagation();
			if (formState?.formRef?.current) {
				const inputs = formState.formRef.current.getElementsByTagName('input');
				const selects =
					formState.formRef.current.getElementsByTagName('select');
				const inputsLength = inputs.length;
				for (let i = 0; i < inputsLength; i++) {
					dispatchEvent(inputs[i]);
				}
				const selectsLength = selects.length;
				for (let i = 0; i < selectsLength; i++) {
					dispatchEvent(selects[i]);
				}
			}

			// Если есть кастомное свойство onSubmit у кнопки, то будет использована функция из него
			if (componentProps.onSubmit) {
				formState.onSubmit(componentProps.onSubmit);
			} else {
				formState.formRef.current.requestSubmit();
			}
		},
		[componentProps.onSubmit, formState],
	);

	return useMemo(
		() =>
			React.createElement(component, {
				...omit(componentProps, ['onSubmit']),
				isInvalid,
				isSubmitting,
				isUntouched,
				onClick,
				type: componentProps.onSubmit ? 'button' : 'submit',
			}),
		[componentProps, isInvalid, isSubmitting, isUntouched],
	);
};

export function createSubmitButton<T extends any = HTMLButtonElement>(
	component: (props: InternalSubmitButtonProps<T>) => JSX.Element,
): (
	props: Omit<
		InternalSubmitButtonProps,
		'isInvalid' | 'isSubmitting' | 'isUntouched' | 'type'
	>,
) => JSX.Element {
	return (props): JSX.Element => {
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
	};
}
