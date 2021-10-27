import React, {useCallback, useEffect, useRef} from 'react';

import _debounce from 'lodash/debounce';

import {ArrayFieldContext} from '~/@common/array-field-context';
import {FormContext} from '~/@common/form-context';

export type FieldProps = {
	name: string;
	validators?: Array<(v: any) => string | undefined>;
	defaultValue?: string;
};

type InternalFieldProps = {
	defaultValue: any;
	errors: string[];
	inputRef: any;
};

/**
 * Компонент принимает пользовательский компонент и возвращает {name, validators, ...props}
 *
 * @component
 *
 * @typedef CreateField
 * @prop {React.ReactNode} [component] Пользовательский компонент
 *
 * @example
 * return (any)
 */

const FieldComponent: React.FC<any> = ({
	name,
	component,
	registerField,
	...props
}) => {
	useEffect(() => {
		if (registerField) {
			registerField(name);
		} else {
			console.warn(
				'Вы используете createField вне формы. Оберните ваш инпут в компонент' +
					' `import {Form} from "@altiore/form";`',
			);
		}
	}, [name, registerField]);

	return (
		<ArrayFieldContext.Consumer>
			{(value) => {
				return React.createElement(component, {
					...props,
					name:
						value?.name && !name.match(new RegExp('^' + String(value?.name)))
							? `${value?.name}.${name}`
							: name,
				});
			}}
		</ArrayFieldContext.Consumer>
	);
};

export const createField = <T extends FieldProps>(
	component: React.FC<T & InternalFieldProps>,
): ((props: T) => JSX.Element) => {
	return ({name, validators, defaultValue, ...props}) => {
		const element = useRef<HTMLInputElement | null>(null);

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
			input.defaultValue = defaultValue || '';
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
			<FormContext.Consumer>
				{(value) => {
					if (!value) {
						return (
							<FieldComponent
								{...{
									component,
									// TODO: ошибки должны попадать в инпут даже вне контекста???
									errors: [],
									inputRef: element,
									name,
									...(props as T),
								}}
							/>
						);
					}

					const {defaultValues, errors, registerField} = value;

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
					);
				}}
			</FormContext.Consumer>
		);
	};
};
