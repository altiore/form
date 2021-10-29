import {ValidateFuncType} from '~/@common/types';

export const maxLength =
	(length: number): ValidateFuncType =>
	(value) => {
		const stringedValue = value.toString();
		if (length < 0) {
			return `Param 'length' cannot be less than 0`;
		}
		if (stringedValue.length > length) {
			return `The length of the entered value should be no more than ${length} characters`;
		}
		return undefined;
	};
