import React, {useMemo} from 'react';

import {ArrayFieldContext} from '~/@common/array-field-context';
import {FormContext} from '~/@common/form-context';
import {useRegisterField} from '~/@common/hooks/use-register-field';
import {ArrayFieldState, FormContextState} from '~/@common/types';

import ArrayField, {
	InternalArrayFieldProps,
	ValidatedArrayFieldProps,
} from './validated-array-field';

type NamedFieldProps<T> = Omit<
	ValidatedArrayFieldProps<T>,
	'field' | 'name' | 'getList'
> & {
	arrayFieldState: ArrayFieldState;
	formState: FormContextState;
	providedName: string;
};

const NamedField = <T,>({
	arrayFieldState,
	formState,
	providedName,
	...rest
}: NamedFieldProps<T>) => {
	const {field, isInsideForm, name} = useRegisterField(
		arrayFieldState,
		formState,
		providedName,
		true,
	);

	const getList = useMemo(() => formState?.getList, [formState?.getList]);

	if (isInsideForm && !field) {
		return null;
	}

	return <ArrayField {...rest} field={field} getList={getList} name={name} />;
};

export type ArrayFieldProps = {
	name: string;
	validators?: Array<(v: any) => string | undefined>;
};

export const createArrayField = <T extends ArrayFieldProps>(
	component: (
		props: Omit<T, 'validators'> & InternalArrayFieldProps,
	) => JSX.Element,
): ((props: T) => JSX.Element) => {
	return ({name, validators, ...props}) => {
		return (
			<FormContext.Consumer>
				{(formState) => (
					<ArrayFieldContext.Consumer>
						{(arrayFieldState) => {
							return (
								<NamedField<Omit<T, 'name' | 'validators'>>
									arrayFieldState={arrayFieldState}
									formState={formState}
									component={component}
									componentProps={props}
									providedName={name}
									validators={validators}
								/>
							);
						}}
					</ArrayFieldContext.Consumer>
				)}
			</FormContext.Consumer>
		);
	};
};
