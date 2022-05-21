import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const regexp: ReusableValidator<RegExp> =
	(getMessage: any, regex: RegExp): ValidateFunc<string> =>
	(value) => {
		const stringedValue = value.toString();
		if (!regex.test(stringedValue)) {
			const defError = `"${stringedValue}" не соответсвует регулярному выражению ${regex}`;
			return getErrorMessage(value, regex, defError, getMessage);
		}
		return undefined;
	};
