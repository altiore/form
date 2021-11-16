import {ValidateFuncType} from '~/@common/types';

export const regexp =
	(regex: RegExp): ValidateFuncType =>
	(value) => {
		const stringedValue = value.toString();
		if (!regex.test(stringedValue)) {
			return {
				error: new Error(
					`${stringedValue} does not fit the regular expression ${regex}`,
				),
				value,
			};
		}
		return undefined;
	};
