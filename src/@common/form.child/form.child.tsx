import React, {useEffect, useMemo} from 'react';

import {FormContext} from '~/@common/form-context';
import {FieldMeta, RegisterField} from '~/@common/types';

interface FormChildFieldProps {
	name: string;
	childOfForm: any;
	registerField?: RegisterField;
	isArray: boolean;
	field?: FieldMeta;
	childOfFormProps: Record<string, any>;
}

const FormChildField = React.memo<FormChildFieldProps>(
	({
		name,
		childOfForm: ChildOfForm,
		registerField,
		isArray,
		field,
		childOfFormProps,
	}) => {
		const isInsideForm = useMemo(() => Boolean(registerField), [registerField]);

		useEffect(() => {
			if (isInsideForm) {
				registerField(name, isArray);
			} else {
				console.warn(
					'Вы используете ваше поле вне формы import {Form} from `@altiore/form`;' +
						' Разместите ваше поле внутри формы чтоб расширить возможности',
				);
			}
		}, [isArray, isInsideForm, name]);

		if (isInsideForm && !field) {
			return null;
		}

		return <ChildOfForm {...childOfFormProps} field={field} name={name} />;
	},
);

type FormChildProps<ChildProps> = {
	component: React.ComponentType<ChildProps & {field: FieldMeta; name: string}>;
	componentProps: ChildProps;
	isArray: boolean;
	name: string;
};

export const FormChild = <ChildProps,>({
	name,
	isArray,
	component,
	componentProps,
}: FormChildProps<ChildProps>): JSX.Element => {
	return (
		<FormContext.Consumer>
			{(form) => {
				return (
					<FormChildField
						childOfForm={component}
						childOfFormProps={componentProps}
						field={form?.fields?.[name]}
						isArray={isArray}
						name={name}
						registerField={form?.registerField}
					/>
				);
			}}
		</FormContext.Consumer>
	);
};
