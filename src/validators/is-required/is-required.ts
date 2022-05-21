import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const isRequired: ReusableValidator<string> =
	(getMessage): ValidateFunc =>
	(value: any) => {
		if (typeof value !== 'string') {
			throw new Error(
				`Неподдерживаемый тип значения для валидации "${typeof value}" передан функции для проверки данных "isRequired"`,
			);
		}

		if (value.length < 1) {
			const defError = `Обязательное поле ввода`;
			return getErrorMessage(value, value, defError, getMessage);
		}
		return undefined;
	};
