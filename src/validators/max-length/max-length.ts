import {ValidateFuncType} from '~/@common/types';

export const maxLength =
	(length: number): ValidateFuncType =>
	(value) => {
		const stringedValue = value.toString();
		if (length < 0) {
			throw new Error(`Param 'length' cannot be less than 0`);
		}
		if (stringedValue.length > length) {
			return {
				error: new Error(`Максимальная длина введенного значения - ${length}`),
				value,
			};
		}
		return undefined;
	};
