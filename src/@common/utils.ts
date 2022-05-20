import {MutableRefObject} from 'react';

import {FieldType} from '~/@common/types';

export const getNodeByName = <T>(
	name: string,
	formRef?: MutableRefObject<HTMLFormElement>,
): null | MutableRefObject<T> => {
	if (formRef?.current) {
		const input = formRef.current.querySelector(`[name="${name}"]`) as any;
		if (input) {
			return {
				current: input,
			} as MutableRefObject<T>;
		}
	} else {
		const input = document.querySelector(`[name="${name}"]`) as any;
		if (input) {
			return {
				current: input,
			} as MutableRefObject<T>;
		}
	}

	return null;
};

export const getValueByNodeName = (
	name: string,
	formRef?: MutableRefObject<HTMLFormElement>,
): any => {
	const foundInputRef = getNodeByName<any>(name, formRef);
	if (foundInputRef) {
		return foundInputRef.current.type === 'checkbox'
			? foundInputRef.current.checked
			: foundInputRef.current.value;
	}

	return null;
};

const getValue = (target: HTMLElement) => (target as HTMLInputElement).value;
const getChecked = (target: HTMLElement) =>
	(target as HTMLInputElement).checked;
const getMultipleSelect = (target: HTMLElement) =>
	[...(target as any).options]
		.filter((el) => el.selected)
		.map((el) => el.value);

const getValueByType = new Map<FieldType, (evt: any) => any>([
	[FieldType.BOOLEAN, getChecked],
	[FieldType.NUMBER, getValue],
	[FieldType.TEXT, getValue],
	[FieldType.SELECT_MULTIPLE, getMultipleSelect],
]);

export const getValueByTypeAndTarget = (
	type: FieldType,
	target: EventTarget | HTMLElement,
): any => {
	const getCurrentValue = getValueByType.get(type) ?? getValue;
	return getCurrentValue(target);
};
