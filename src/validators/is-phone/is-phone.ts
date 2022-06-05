import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const isPhone: ReusableValidator<string> =
	(getMessage = null): ValidateFunc<string> =>
	(value) => {
		if (value === undefined || value === null) {
			return undefined;
		}

		const regexpPhone = /^\+\d{11}$/;

		if (typeof value !== 'string' || !regexpPhone.test(value)) {
			const defError = `Телефон должен начинаться с "+" и содержать 11 цифр`;
			return getErrorMessage(value, value, defError, getMessage);
		}
		return undefined;
	};
