import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const minLength: ReusableValidator<number> =
	(getMessage = null, length: number): ValidateFunc<string | any[]> =>
	(value) => {
		if (typeof value?.length !== 'number') {
			throw new Error(
				`Неподдерживаемый тип значения для валидации "${typeof value}" передан функции для проверки данных "minLength"`,
			);
		}
		if (length < 0) {
			throw new Error(`Заданная длина не может быть меньше нуля`);
		}
		if (value.length < length) {
			const defError = `Минимальная длина введенного значения - ${length}`;
			return getErrorMessage(value, length, defError, getMessage);
		}
		return undefined;
	};
