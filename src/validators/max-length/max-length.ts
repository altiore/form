import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';
import {pluralNoun} from '~/validators/@common/plural';

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
			const defError = `Максимум ${length} символ${pluralNoun(
				length,
				'',
				'а',
				'ов',
			)}`;
			return getErrorMessage(value, length, defError, getMessage);
		}
		return undefined;
	};
