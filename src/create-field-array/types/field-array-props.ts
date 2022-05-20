import {ValidateFunc} from '~/@common/types';

export type FieldArrayProps = {
	name: string;
	validate?: Array<ValidateFunc>;
};
