import {MouseEventHandler, MutableRefObject} from 'react';

/**
 * "button|checkbox|file|hidden|image|password|radio|reset|submit|text|password
 */
export enum FieldType {
	ARRAY = 'array',
	BOOLEAN = 'checkbox',
	CHECKBOX = 'checkbox',
	ENUM = 'enum',
	NUMBER = 'number',
	PASSWORD = 'password',
	TEXT = 'text',
	EMAIL = 'email',
	SELECT = 'select',
	SELECT_MULTIPLE = 'select-multiple',
}

export type NamedFieldProps<T, R extends string> = Omit<T, R> & {
	fieldArrayState: FieldArrayState;
	formState: FormContextState;
	providedName: string;
};

export enum InsertPosition {
	BEFORE = 0,
	AFTER = 1,
}

export interface ListItem<
	Item extends Record<string, any> = Record<string, any>,
> {
	key: string;
	append: (initialValue?: Item) => void;
	prepend: (initialValue?: Item) => void;
	remove: () => void;
}

export type ListInterface<
	Item extends Record<string, any> = Record<string, any>,
> = {
	map: (arg: (el: ListItem, index: number) => JSX.Element) => JSX.Element[];
	add: ((initialValue?: Item) => void) & MouseEventHandler<unknown>;
	remove: (index: number) => void;
};

export type RegisterField = (
	fieldName: string,
	fieldType?: FieldType,
	defaultValue?: any,
	hasValidators?: boolean,
) => void;

export type SetErrors = (name: string, errors: string[] | undefined) => void;

export type FieldMeta<ValueType = any> = {
	name: string;
	defaultValue?: ValueType;
	errors: string[];
	// массив номеров в порядке, в котором элементы массива расположены на экране
	// используюет только для fieldType === FieldType.ARRAY
	items?: number[];
	setErrors: (errors: string[]) => void;
	type?: FieldType;
	isUntouched?: boolean;

	// избыточные поля, которые нужны ТОЛЬКО для удобства
	isInvalid: boolean;
	error?: string;
};

export type FormContextState = {
	fields: Record<string, FieldMeta>;
	formRef: MutableRefObject<HTMLFormElement>;
	isSubmitting: boolean;
	registerField: RegisterField;
	setItems: (
		fieldName: string,
		setItems: (i: number[]) => number[],
		errors: string[],
		defValue?: any,
	) => void;
};

export interface FieldArrayState {
	name: string;
}

// Если возвращает строку - это означает, что есть ошибка. undefined означает, что ошибки нет
export type ValidateFuncType = (
	value: any,
	fieldName?: string,
	getFieldValueByName?: (name: string) => any,
) => string | undefined;

export type ReusableValidator<T> = (
	getMessage: null | undefined | string | ((value: any, forCheck: T) => string),
	forCheck?: T,
) => ValidateFuncType;
