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

const FieldComponent: React.FC<any> = ({
	name,
	component,
	registerField,
	...props
}) => {
	useEffect(() => {
		registerField(name);
	}, [name, registerField]);

	return React.createElement(component, {
		...props,
		name,
	});
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
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				return () => {};
			}

			const hasEventHandler = Boolean(validators?.length && input);
			if (hasEventHandler) {
				input.addEventListener('blur', handleBlur);
			}

			return () => {
				if (hasEventHandler) {
					input.removeEventListener('blur', handleBlur);
				}
			};
		}, [element, name, validators]);

		return (
			<FormContext.Consumer>
				{({defaultValues, errors, registerField}) => {
					// registerField(name);
					return (
						<FieldComponent
							{...{
								component,
								defaultValue: defaultValues?.[name],
								errors: errors?.[name] ?? [],
								inputRef: element,
								name,
								registerField,
								...(props as T),
							}}
						/>
					) as any;
				}}
			</FormContext.Consumer>
		);
	};
};
