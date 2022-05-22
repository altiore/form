import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const isRequired: ReusableValidator<string> =
	(getMessage = null): ValidateFunc =>
	(value: any) => {
		if (
			value === undefined ||
			value === null ||
			(typeof value === 'string' && value.trim()) === '' ||
			Number.isNaN(value)
		) {
			const defError = `Обязательное поле`;
			return getErrorMessage(value, value, defError, getMessage);
		}
		return undefined;
	};
