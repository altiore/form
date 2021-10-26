import React, {useCallback, useEffect, useRef} from 'react';

import _debounce from 'lodash/debounce';

import {FormContext} from '~/@common/form-context';

export type FieldProps = {
	name: string;
	validators?: Array<(v: any) => string | undefined>;
};

type InternalFieldProps = {
	defaultValue: any;
	errors: string[];
	inputRef: any;
};

export const createField = <T extends FieldProps>(
	component: React.FC<T & InternalFieldProps>,
): ((props: T) => JSX.Element) => {
	return ({name, validators, ...props}) => {
		const element = useRef<HTMLDivElement | null>(null);

		const handleDebounceFn = useCallback(
			(e: Event) => {
				e.preventDefault();

				const hasValidation = Boolean(validators?.length && e.target);
				if (hasValidation) {
					const {value} = e.target as never;

					const errors = [];
					validators.forEach((validate) => {
						const error = validate(value);
						if (error) {
							errors.push(error);
						}
					});
				}
			},
			[validators],
		);

		const debounceHandle = useCallback(_debounce(handleDebounceFn, 200), []);

		const handleBlur = useCallback(
			(e: Event) => {
				debounceHandle(e);
			},
			[debounceHandle],
		);

		useEffect(() => {
			const input = element.current;

			if (!input) {
				throw new Error(`Input c name=${name} не был найден`);
			}

			const hasEventHandler = Boolean(validators?.length && input);
			if (hasEventHandler) {
				input.addEventListener('blur', handleBlur);
			}

			return () => {
				if (hasEventHandler) {
					input.removeEventListener('blur', handleBlur);
				} else {
					throw new Error(`Input c name=${name} не был найден`);
				}
			};
		}, [element, name, validators]);

		return (
			<FormContext.Consumer>
				{(value) => {
					return React.createElement(component, {
						defaultValue: value.defaultValues?.[name],
						errors: value.errors?.[name] ?? [],
						inputRef: element,
						name,
						...props as T,
					});
				}}
			</FormContext.Consumer>
		);
	};
};
