import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const maxLength: ReusableValidator<number> =
	(getMessage = null, length: number): ValidateFunc<string | any[]> =>
	(value, fieldName) => {
		if (length < 0) {
			throw new Error(`Заданная длина не может быть меньше нуля`);
		}
		if (value === undefined) {
			return undefined;
		}
		if (typeof value?.length !== 'number') {
			const defError = `Невозможно проверить длину поля "${fieldName}" - неверный тип данных`;
			return getErrorMessage(value, length, defError, getMessage);
		}
		if (value.length > length) {
			const defError = `Максимальная длина введенного значения - ${length}`;
			return getErrorMessage(value, length, defError, getMessage);
		}
		return undefined;
	};
