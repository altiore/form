import {MutableRefObject, useMemo} from 'react';

import {ValidateFuncType} from '~/@common/types';

const DEF_GET_VALUE = () =>
	console.info('Получение переменной внутри валидации массива не реализовано');

export const useValidateList = (
	inputRef: MutableRefObject<HTMLElement>,
	validators: Array<ValidateFuncType>,
	items: Array<number>,
): string[] => {
	return useMemo(() => {
		const hasValidation = Boolean(validators?.length);
		const ers: string[] = [];
		if (hasValidation) {
			validators.forEach((validate) => {
				const result = validate.validate(items, DEF_GET_VALUE);
				if (result?.error) {
					ers.push(result.error.message);
				}
			});
		}
		return ers;
	}, [validators, items]);
};
