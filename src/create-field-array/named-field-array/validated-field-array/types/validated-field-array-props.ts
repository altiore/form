import {FieldMeta, ValidateFuncType} from '~/@common/types';

import {InternalFieldArrayProps} from './internal-field-array-props';

export interface ValidatedFieldArrayProps<T> {
	component: (
		props: Omit<T, 'validators'> & InternalFieldArrayProps,
	) => JSX.Element;
	componentProps: T;
	field: FieldMeta;
	name: string;
	setItems: (
		fieldName: string,
		setItems: (i: number[]) => number[],
		errors: [],
		defValue?: any,
	) => void;
	validators: Array<ValidateFuncType>;
}
