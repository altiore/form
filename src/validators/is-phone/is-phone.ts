import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const isPhone: ReusableValidator<string> =
	(getMessage = null): ValidateFunc<string> =>
	(value) => {
		if (value === undefined) {
			return undefined;
		}

		const regexpPhone = /^\+\d{12}$|^\+\d{11}$/;

		if (typeof value !== 'string' || !regexpPhone.test(value)) {
			const defError = `Телефон должен начинаться с "+" и содержать 11 или 12 цифр`;
			return getErrorMessage(value, value, defError, getMessage);
		}
		return undefined;
	};
