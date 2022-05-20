import {ValidateFunc} from '~/@common/types';
import {minLength as mainMinLength} from '~/validators';

export const minLength = mainMinLength.bind(
	undefined,
	'Минимум $COMPARATOR символа',
) as (min: number) => ValidateFunc;
