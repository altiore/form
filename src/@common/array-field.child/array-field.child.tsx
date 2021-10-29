import React, {useMemo} from 'react';

import {ArrayFieldContext} from '~/@common/array-field-context';
import {FieldMeta, RegisterField} from '~/@common/types';

interface ArrayFieldChildFieldProps {
	name: string;
	component: any;
	componentProps: Record<string, any>;
	registerField?: RegisterField;
	field?: FieldMeta;
}

const ArrayFieldChildField = React.memo<ArrayFieldChildFieldProps>(
	({name, component: MyComponent, componentProps, registerField, field}) => {
		const isInsideForm = useMemo(() => Boolean(registerField), [registerField]);

		if (isInsideForm && !field) {
			return null;
		}

		return <MyComponent {...componentProps} field={field} name={name} />;
	},
);

export type ArrayFieldChildProps<ChildProps> = {
	component: React.ComponentType<ChildProps & {field: FieldMeta; name: string}>;
	componentProps: ChildProps;
	name: string;
	field: FieldMeta;
	registerField: RegisterField;
};

/**
 * Этот компонент задает правильное имя для input-а
 */
export const ArrayFieldChild = <T,>({
	component,
	componentProps,
	field,
	name,
	registerField,
}: ArrayFieldChildProps<T>): JSX.Element => {
	return (
		<ArrayFieldContext.Consumer>
			{(value) => {
				const fieldName =
					value?.name && !name.match(new RegExp('^' + String(value.name)))
						? `${value.name}.${name}`
						: name;

				return (
					<ArrayFieldChildField
						component={component}
						componentProps={componentProps}
						field={field}
						name={fieldName}
						registerField={registerField}
					/>
				);
			}}
		</ArrayFieldContext.Consumer>
	);
};
