import {ReusableValidator, ValidateFuncType} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const checkEmail: ReusableValidator<string> =
	(getMessage): ValidateFuncType =>
	(value) => {
		if (typeof value !== 'string') {
			throw new Error(
				`Неподдерживаемый тип значения для валидации "${typeof value}" передан функции для проверки данных "checkEmail"`,
			);
		}

		const regexpEmail =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

		if (!regexpEmail.test(value)) {
			const defError = `Введите корректный email`;
			return getErrorMessage(value, value, defError, getMessage);
		}
		return undefined;
	};
