import {MutableRefObject} from 'react';

import {FieldMeta, FieldType, ValidateFuncType} from '~/@common/types';

import {InternalFieldProps} from './internal-field-props';

export interface ValidatedFieldProps<T, Input> {
	component: (
		props: Omit<T, 'validators'> & InternalFieldProps<Input> & FieldMeta,
	) => JSX.Element;
	componentProps: T;
	field: FieldMeta;
	formRef?: MutableRefObject<HTMLFormElement>;
	name: string;
	type?: FieldType;
	validators: Array<ValidateFuncType>;
	hideErrorInXSec?: false | number;
}
