import {ValidateFuncType} from '~/@common/types';

export const maxLength = (length: number): ValidateFuncType => ({
	validate: (value) => {
		const stringedValue = value.toString();
		if (length < 0) {
			return {error: new Error(`Param 'length' cannot be less than 0`), value};
		}
		if (stringedValue.length > length) {
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
