import {MutableRefObject, useMemo} from 'react';

import {ValidateFuncType} from '~/@common/types';

const DEF_GET_VALUE = () =>
	console.info('Получение переменной внутри валидации массива не реализовано');

export const useValidateList = (
	inputRef: MutableRefObject<HTMLElement>,
	validators: Array<ValidateFuncType>,
	items: Array<number>,
	name?: string,
): string[] => {
	return useMemo(() => {
		const hasValidation = Boolean(validators?.length);
		const ers: string[] = [];
		if (hasValidation) {
			validators.forEach((validate) => {
				// TODO: вместо того, чтоб передавать в эту функцию для валидации items,
				//   возможно, целесообразнее найти все значения массива
				const result = validate(items, name, DEF_GET_VALUE);
				if (result) {
					ers.push(result);
				}
			});
		}
		return ers;
	}, [validators, items, name]);
};
