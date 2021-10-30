import {ValidateFuncType} from '~/@common/types';

export const minLength =
	(length: number): ValidateFuncType =>
	(value: string | any[] = '') => {
		if (typeof value?.length !== 'number') {
			throw new Error(
				`Not supported type "${typeof value}" provided to validate function "minLength"`,
			);
		}
		if (length < 0) {
			throw new Error(`Param 'length' cannot be less than 0`);
		}
		if (value.length < length) {
			return `The length of the entered value should be no more than ${length} characters`;
		}
		return undefined;
	};
