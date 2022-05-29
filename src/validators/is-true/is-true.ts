import {ReusableValidator, ValidateFunc} from '~/@common/types';
import {getErrorMessage} from '~/validators/@common/get-error-message';

export const isTrue: ReusableValidator<boolean> =
	(getMessage = null): ValidateFunc =>
	(value: boolean) => {
		if (value !== true) {
			const defError = `Нужно принять условия`;
			return getErrorMessage(value, value, defError, getMessage);
		}
		return undefined;
	};
