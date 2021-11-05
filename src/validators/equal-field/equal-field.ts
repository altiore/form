import {getFieldByName} from '~/@common/get-field-by-name';
import {ValidateFuncType} from '~/@common/types';

export const equalField = (fieldName: string): ValidateFuncType => ({
	validate: (value) => {
		const selector: any = getFieldByName(fieldName);
		if (value !== selector.value) {
			return {
				error: new Error(`The values of the fields must match: ${fieldName}`),
				value,
			};
		}
		return undefined;
	},
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const equalFieldByRef = (ref: any): ValidateFuncType => ({
	validate: (value) => {
		if (value !== ref.current.value) {
			return {
				error: new Error(
					`The values of the fields must match: ${ref.current.name}`,
				),
				value,
			};
		}
		return undefined;
	},
});
