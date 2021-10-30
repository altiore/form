import {MutableRefObject, useState} from 'react';

import {FieldMeta, ValidateFuncType} from '~/@common/types';

export const useValidateList = (
	inputRef: MutableRefObject<HTMLElement>,
	validators: Array<ValidateFuncType>,
	field?: FieldMeta,
): string[] => {
	const [errors] = useState<string[]>([]);

	return field?.errors ?? errors;
};
