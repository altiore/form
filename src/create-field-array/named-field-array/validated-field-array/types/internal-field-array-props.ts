import {MutableRefObject} from 'react';

import {ListInterface} from '~/@common/types';

export type InternalFieldArrayProps = {
	listRef: MutableRefObject<HTMLElement>;
	errors: string[];
	list: ListInterface;
};
