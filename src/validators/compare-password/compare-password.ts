import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const comparePassword: ReusableValidator<string> =
	(getMessage = null, namePasswordField = 'password'): ValidateFunc<string> =>
	(value, fieldName, getFieldValueByName) => {
		if (typeof namePasswordField !== 'string') {
			throw new Error(
				`Укажите поле, с которым хотите сравнить текущее значение "${value}" для проверки данных, например: "comparePassword('password')"`,
			);
		}

		if (!getFieldValueByName) {
			throw new Error(
				`Валидатор "comparePassword" должен содержать getFieldValueByName функцию для корректной работы`,
			);
		}

		const firstPassword = getFieldValueByName(namePasswordField);

		if (value !== firstPassword) {
			const defError = `Пароль не совпадает`;
			return getErrorMessage(value, firstPassword, defError, getMessage);
		}
		return undefined;
	};
