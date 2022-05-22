import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const isEmail: ReusableValidator<string> =
	(getMessage = null): ValidateFunc<string> =>
	(value) => {
		if (value === undefined || value === null) {
			return undefined;
		}

		const regexpEmail =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (typeof value !== 'string' || !regexpEmail.test(value)) {
			const defError = `Введите корректный email`;
			return getErrorMessage(value, value, defError, getMessage);
		}
		return undefined;
	};
