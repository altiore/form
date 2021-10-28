import React, {useCallback, useEffect, useMemo, useRef} from 'react';

import _debounce from 'lodash/debounce';

import {ArrayFieldContext} from '~/@common/array-field-context';
import {FormContextState} from '~/@common/types';
import {FieldProps} from '~/create-field';

interface FieldComponentInsideFormPropsWithArrayContext {
	component: any;
	form: FormContextState;
	name: string;
	validators?: FieldProps['validators'];
	outerName?: string;
}

const FieldComponent: React.FC<FieldComponentInsideFormPropsWithArrayContext> =
	({component, form, name, outerName, validators, ...props}) => {
		const {defaultValues, errors, registerField, setErrors} = form;

		const fieldName = useMemo(() => {
			return outerName && !name.match(new RegExp('^' + String(outerName)))
				? `${outerName}.${name}`
				: name;
		}, [outerName, name]);

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
					setErrors(fieldName, errors);
				}
			},
			[fieldName, setErrors, validators],
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
		}, [element, validators]);

		useEffect(() => {
			if (registerField) {
				registerField(fieldName);
			} else {
				console.warn(
					'Вы используете createField вне формы. Оберните ваш инпут в компонент' +
						' `import {Form} from "@altiore/form";`',
				);
			}
		}, [fieldName, registerField]);

		return React.createElement(component, {
			...props,
			defaultValue: defaultValues?.[fieldName],
			errors: errors?.[fieldName] ?? [],
			inputRef: element,
			name: fieldName,
		});
	};

type FieldComponentInsideFormProps = Omit<
	FieldComponentInsideFormPropsWithArrayContext,
	'outerName'
>;

export const FieldComponentInsideForm: React.FC<FieldComponentInsideFormProps> =
	(props) => {
		return (
			<ArrayFieldContext.Consumer>
				{(value) => {
					return <FieldComponent outerName={value?.name} {...props} />;
				}}
			</ArrayFieldContext.Consumer>
		);
	};
