import merge from 'lodash/merge';

import {FieldMeta} from '~/@common/types';

export function mergeMetaPropsToField<T>(
	fieldProps: T,
	fieldMeta: FieldMeta,
): T & FieldMeta {
	return merge(fieldProps, fieldMeta);
}
