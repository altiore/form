import React, {useCallback, useEffect, useRef, useState} from 'react';

import _debounce from 'lodash/debounce';

import {ArrayFieldContext} from '~/@common/array-field-context';
import {FieldProps} from '~/create-field';

interface FieldComponentInsideFormProps {
	component: any;
	name: string;
	validators?: FieldProps['validators'];
}

export const FieldComponentOutsideForm: React.FC<FieldComponentInsideFormProps> =
	({component, name, validators, ...props}) => {
		const [localErrors, setLocalErrors] = useState<string[]>([]);

		const element = useRef<HTMLDivElement | null>(null);

		const handleDebounceFn = useCallback(
			(e: Event) => {
				e.preventDefault();

				const hasValidation = Boolean(validators?.length && e.target);
				if (hasValidation) {
					const {value} = e.target as never;

					const errors: string[] = [];
					validators.forEach((validate) => {
						const error = validate(value);
						if (error) {
							errors.push(error);
						}
					});
					setLocalErrors(errors);
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
				console.warn(
					'Похоже, вы забыли добавить использование inputRef внутри createField' +
						' декоратора',
				);
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
			<ArrayFieldContext.Consumer>
				{(value) => {
					return React.createElement(component, {
						...props,
						errors: localErrors,
						inputRef: element,
						name:
							value?.name && !name.match(new RegExp('^' + String(value?.name)))
								? `${value?.name}.${name}`
								: name,
					});
				}}
			</ArrayFieldContext.Consumer>
		);
	};
