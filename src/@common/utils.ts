import {MutableRefObject} from 'react';

import {getCountryCode} from '~/@common/get-country-code';
import {FieldType, InputType} from '~/@common/types';

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
	[FieldType.CHECKBOX, getChecked],
	[FieldType.NUMBER, getValue],
	[FieldType.FLOAT, getValue],
	[FieldType.TEXT, getValue],
	[FieldType.SELECT_MULTIPLE, getMultipleSelect],
]);

const parseBoolean = (value: string | undefined): any =>
	typeof value === 'boolean' ? value : value === 'on';
const parseNumber = (value: string): any => parseInt(value, 10);
const parseDefault = (value: string): any => (value === '' ? null : value);
const parsePhone = (value: string): any =>
	typeof value === 'string' ? value.replace(/[()\s\-]/gi, '') : value;
const toArray = (value: any): string[] => {
	if (typeof value === 'string') {
		return [value];
	}

	if (Array.isArray(value)) {
		return value;
	}

	return [];
};

export const parseValueByType = new Map<FieldType, (a: any) => any>([
	[FieldType.TEXT, parseDefault],
	[FieldType.BOOLEAN, parseBoolean],
	[FieldType.NUMBER, parseNumber],
	[FieldType.FLOAT, parseFloat],
	[FieldType.SELECT_MULTIPLE, toArray],
	[FieldType.PHONE, parsePhone],
]);

export const inputTypeByType = new Map<FieldType, InputType>([
	[FieldType.BOOLEAN, 'checkbox'],
	[FieldType.CHECKBOX, 'checkbox'],
	[FieldType.ENUM, 'text'],
	[FieldType.PASSWORD, 'password'],
	[FieldType.EMAIL, 'email'],
	[FieldType.TEXT, 'text'],
	[FieldType.NUMBER, 'number'],
	[FieldType.FLOAT, 'number'],
	[FieldType.PHONE, 'tel'],
]);

export const getInputTypeByFieldType = (fieldType: FieldType): InputType => {
	return inputTypeByType.has(fieldType)
		? inputTypeByType.get(fieldType)
		: (fieldType as InputType);
};

const digitStrArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const formatPhone = function formatPhoneNumber(
	phoneNumberString: string,
): string | null {
	const match = phoneNumberString.match(
		/^(\+?38?\s?|\+?7?\s?)?(\s?\(?\d{3}\)?\s?|\s?\(?\d{2}|\s?\(?\d|\s?\(?)?(\d{3}|\d{2}|\d)?(\s?-?\s?\d{2}|\s?-?\s?\d|\s?-?\s?)?(\s?-?\s?\d{4}|\s?-?\s?\d{3}|\s?-?\s?\d{2}|\s?-?\s?\d|\s?-?\s?)?$/,
	);
	if (match) {
		let res = '';
		if (match[1]) {
			res += match[1][0] === '+' ? match[1] : `+${match[1]}`;
		} else if (phoneNumberString.length) {
			res = getCountryCode() + res;
		}
		if (match[2]) {
			res = res.replace(/\s$/gi, '') + ' (' + match[2].replace(/^[\s(]/gi, '');
		}
		if (match[3]) {
			res = res.replace(/\)?\s?$/gi, '') + ') ' + match[3];
		} else if (match[4]) {
			res = res.replace(/\)?\s?$/gi, '') + ') ';
		}
		if (match[4]) {
			res =
				res.replace(/\s?-?\s?$/gi, '') +
				(digitStrArr.includes(match[4][0])
					? ' - ' + match[4]
					: digitStrArr.includes(match[4][1]) ||
					  digitStrArr.includes(match[4][2])
					? match[4].replace(/^\s?-?\s?/gi, ' - ')
					: match[4]);
		}
		if (match[5]) {
			res =
				res.replace(/\s?-?\s?$/gi, '') +
				(digitStrArr.includes(match[5][0])
					? ' - ' + match[5]
					: digitStrArr.includes(match[5][1]) ||
					  digitStrArr.includes(match[5][2])
					? match[5].replace(/^\s?-?\s?/gi, ' - ')
					: match[5]);
		}
		return res;
	}
	return formatPhone(phoneNumberString.replace(/[()\s\-+a-zа-я]/gi, ''));
};

export const formatValueByType = new Map([[FieldType.PHONE, formatPhone]]);

export const PassWarn = {
	minLength: 'Минимум 8 символов',
	// eslint-disable-next-line sort-keys
	lowerRequired: 'Минимум 1 буква в нижнем регистре',
	// eslint-disable-next-line sort-keys
	digitRequired: 'Минимум 1 цифра',
	upperRequired: 'Минимум 1 буква в верхнем регистре',
	// eslint-disable-next-line sort-keys
	specRequired: 'Минимум 1 спец. символ % * ( ) ? ! @ # ₽ ...',
};

const warningPassword = (value: string): string[] => {
	if (!value) {
		return Object.values(PassWarn);
	}
	const warnings = [];
	if (value.length < 8) {
		warnings.push(PassWarn.minLength);
	}
	if (!value.match(/[a-zА-Я]+/g)) {
		warnings.push(PassWarn.lowerRequired);
	}
	if (!value.match(/[0-9]+/g)) {
		warnings.push(PassWarn.digitRequired);
	}
	if (!value.match(/[A-ZА-Я]+/g)) {
		warnings.push(PassWarn.upperRequired);
	}
	if (!value.match(/[!"№%:,.;()_+\[\]@#₽$^&*=±§<>?\\|\/~`'\-}{]+/g)) {
		warnings.push(PassWarn.specRequired);
	}

	return warnings;
};

export const warningsByType = new Map([[FieldType.PASSWORD, warningPassword]]);

export const getValueByTypeAndTarget = (
	fieldType: FieldType,
	target: EventTarget | HTMLElement,
): any => {
	const getCurrentValue = getValueByType.get(fieldType) ?? getValue;
	const value = getCurrentValue(target);

	const prepareValue = parseValueByType.get(fieldType || FieldType.TEXT);
	return prepareValue ? prepareValue(value) : value;
};
