import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const comparePassword: ReusableValidator<string> =
	(getMessage = null, namePasswordField = 'password'): ValidateFunc<string> =>
	(value, fieldName, getFieldValueByName) => {
		if (typeof namePasswordField !== 'string') {
			throw new Error(
				`Неподдерживаемый тип значения для валидации "${typeof value}" передан функции для проверки данных "comparePassword"`,
			);
		}

		if (!getFieldValueByName) {
			throw new Error(
				`Валидатор формы должен содержать getFieldValueByName функцию для корректной работы`,
			);
		}

		const firstPassword = getFieldValueByName(namePasswordField);

		if (value !== firstPassword) {
			const defError = `Пароль не совпадает`;
			return getErrorMessage(value, firstPassword, defError, getMessage);
		}
		return undefined;
	};
