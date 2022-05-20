import {FieldMeta, ValidateFunc} from '~/@common/types';

import {InternalFieldArrayProps} from './internal-field-array-props';

export interface ValidatedFieldArrayProps<T> {
	component: (
		props: Omit<T, 'validate'> & InternalFieldArrayProps,
	) => JSX.Element;
	componentProps: T;
	field: FieldMeta;
	name: string;
	setItems: (
		fieldName: string,
		setItems: (i: number[]) => number[],
		setErrors: (i: number[]) => string[],
		defValue?: any,
	) => void;
	validators: Array<ValidateFunc>;
}
