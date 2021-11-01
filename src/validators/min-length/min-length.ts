import {ValidateFuncType} from '~/@common/types';

export const minLength = (length: number): ValidateFuncType => ({
	validate: (value: string | any[] = '') => {
		if (typeof value?.length !== 'number') {
			return {
				error: new Error(
					`Not supported type "${typeof value}" provided to validate function "minLength"`,
				),
				value,
			};
		}
		if (length < 0) {
			return {
				error: new Error(`Param 'length' cannot be less than 0`),
				value,
			};
		}
		if (value.length < length) {
			return {
				error: new Error(
					`The length of the entered value should be no more than ${length} characters`,
				),
				value,
			};
		}
		return undefined;
	},
});
