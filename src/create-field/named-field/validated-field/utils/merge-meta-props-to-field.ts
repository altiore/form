import merge from 'lodash/merge';

import {FieldMeta} from '~/@common/types';

export function mergeMetaPropsToField<T>(
	fieldMeta: FieldMeta,
	fieldProps: T,
): T & FieldMeta {
	return merge(fieldProps, fieldMeta);
}
