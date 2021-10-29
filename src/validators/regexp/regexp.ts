import {ValidateFuncType} from '~/@common/types';

export const regexp =
	(regex: RegExp): ValidateFuncType =>
	(value) => {
		const stringedValue = value.toString();
		if (!regex.test(stringedValue)) {
			return `${stringedValue} does not fit the regular expression ${regex}`;
		}
		return undefined;
	};
