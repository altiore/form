import React, {useCallback, useEffect, useMemo} from 'react';

import intersection from 'lodash/intersection';

import {forbiddenPropsError} from '~/@common/errors';
import {FormContext} from '~/@common/form-context';
import {
	FormContextState,
	SubmitInnerProps,
	SubmitOuterProps,
} from '~/@common/types';

type SubmitButtonProps = SubmitOuterProps & {
	component: any;
	componentProps: Record<string, any>;
	formState?: FormContextState;
};

const getIsInvalid = (fields: FormContextState['fields']) =>
	fields ? Object.values(fields).some((el) => el.isInvalid) : false;

const SubmitButton: React.FC<SubmitButtonProps> = ({
	component,
	componentProps,
	formState,
	onSubmit,
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
			if (onSubmit) {
				formState.onSubmit(onSubmit);
			} else {
				formState.formRef.current.requestSubmit();
			}
		},
		[onSubmit, fields, formState],
	);

	useEffect(() => {
		const forbiddenProps = intersection(Object.keys(componentProps), [
			'isInvalid',
			'isSubmitting',
			'isUntouched',
			'onClick',
			'type',
		]);
		forbiddenPropsError(forbiddenProps, 'SubmitButton');
	}, [componentProps]);

	return useMemo(
		() =>
			React.createElement(component, {
				...componentProps,
				isInvalid,
				isSubmitting,
				isUntouched,
				onClick,
				type: onSubmit ? 'button' : 'submit',
			}),
		[componentProps, fields, isInvalid, isSubmitting, isUntouched],
	);
};

export function createSubmit<
	CustomSubmitProps extends Record<string, any> = SubmitOuterProps,
	El extends any = HTMLButtonElement,
>(
	component: (props: CustomSubmitProps & SubmitInnerProps<El>) => JSX.Element,
): (props: CustomSubmitProps & SubmitOuterProps) => JSX.Element {
	return ({
		onSubmit,
		...props
	}: CustomSubmitProps & SubmitOuterProps): JSX.Element => {
		return (
			<FormContext.Consumer>
				{(formState) => (
					<SubmitButton
						onSubmit={onSubmit}
						component={component}
						componentProps={props as CustomSubmitProps}
						formState={formState}
					/>
				)}
			</FormContext.Consumer>
		);
	};
}
