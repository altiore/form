import React, {ButtonHTMLAttributes, useCallback, useMemo} from 'react';

import omit from 'lodash/omit';

import {FormContext} from '~/@common/form-context';
import {FormContextState} from '~/@common/types';

export interface InternalSubmitButtonProps<T = HTMLButtonElement>
	extends ButtonHTMLAttributes<T> {
	isInvalid: boolean;
	isSubmitting: boolean;
	isUntouched: boolean;
}

interface SubmitButtonProps {
	component: any;
	componentProps: Record<string, any>;
	formState?: FormContextState;
}

export interface SubmitProps {
	onSubmit?: (values: any) => Promise<any>;
}

const getIsInvalid = (fields: FormContextState['fields']) =>
	fields ? Object.values(fields).some((el) => el.isInvalid) : false;

const SubmitButton: React.FC<SubmitButtonProps> = ({
	component,
	componentProps,
	formState,
}) => {
	const fields = useMemo(() => formState?.fields, [formState?.fields]);
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

			// Если есть кастомное свойство onSubmit у кнопки, то будет использована функция из него
			if (componentProps.onSubmit) {
				formState.onSubmit(componentProps.onSubmit);
			} else {
				formState.formRef.current.requestSubmit();
			}
		},
		[componentProps.onSubmit, fields, formState],
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
		[componentProps, fields, isInvalid, isSubmitting, isUntouched],
	);
};

export function createSubmitButton<
	T extends SubmitProps,
	El extends any = HTMLButtonElement,
>(
	component: (
		props: Omit<T, 'onSubmit'> & InternalSubmitButtonProps<El>,
	) => JSX.Element,
): (
	props: T &
		Omit<
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
