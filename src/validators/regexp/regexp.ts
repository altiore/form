import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const regexp: ReusableValidator<RegExp> =
	(getMessage: any, regex: RegExp): ValidateFunc<string> =>
	(value, fieldName) => {
		if (value === undefined || value === null) {
			return undefined;
		}
		if (typeof value !== 'string') {
			const defError = `Невозможно проверить на соответствие поле "${fieldName}" - неверный тип данных`;
			return getErrorMessage(value, length, defError, getMessage);
		}
		const stringedValue = String(value);

		if (!regex.test(stringedValue)) {
			const defError = `"${stringedValue}" не соответсвует регулярному выражению ${regex}`;
			return getErrorMessage(value, regex, defError, getMessage);
		}
		return undefined;
	};
