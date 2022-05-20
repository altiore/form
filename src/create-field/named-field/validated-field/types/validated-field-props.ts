import {MutableRefObject} from 'react';

import {FieldMeta, FieldType, ValidateFunc} from '~/@common/types';

import {InternalFieldProps} from './internal-field-props';

export interface ValidatedFieldProps<T, Input> {
	component: (
		props: Omit<T, 'validate'> & InternalFieldProps<Input> & FieldMeta,
	) => JSX.Element;
	componentProps: T;
	field: FieldMeta;
	formRef?: MutableRefObject<HTMLFormElement>;
	name: string;
	type?: FieldType;
	validate: ValidateFunc | Array<ValidateFunc>;
	hideErrorInXSec?: false | number;
}
