import {MouseEventHandler, MutableRefObject} from 'react';

/**
 * "button|checkbox|file|hidden|image|password|radio|reset|submit|text|password
 */
export enum FieldType {
	ARRAY = 'array',
	BOOLEAN = 'boolean',
	CHECKBOX = 'checkbox',
	ENUM = 'enum',
	NUMBER = 'number',
	FLOAT = 'float',
	PASSWORD = 'password',
	TEXT = 'text',
	EMAIL = 'email',
	SELECT = 'select',
	SELECT_MULTIPLE = 'select-multiple',
}

export type NamedFieldProps = {
	fieldArrayState: FieldArrayState;
	formState: FormContextState;
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
	fieldType: FieldType,
	defaultValue?: any,
	validators?: Array<ValidateFunc>,
) => void;

export type SetErrors = (name: string, errors: string[] | undefined) => void;

export type FieldMeta<ValueType = any> = {
	name: string;
	defaultValue?: ValueType;
	errors: string[];
	// массив номеров в порядке, в котором элементы массива расположены на экране
	// используюет только для fieldType === FieldType.ARRAY
	items?: number[];
	setErrors: (errors: string[], force?: boolean) => void;
	type?: FieldType;
	isUntouched?: boolean;

	// избыточные поля, которые нужны ТОЛЬКО для удобства
	isInvalid: boolean;
	error?: string;
	validators: Array<ValidateFunc>;
};

export type FormContextState = {
	fields: Record<string, FieldMeta>;
	formRef: MutableRefObject<HTMLFormElement>;
	isSubmitting: boolean;
	registerField: RegisterField;
	setItems: (
		fieldName: string,
		setItems: (i: number[]) => number[],
		getErrors: (i: number[]) => string[],
		defValue?: any,
	) => void;
	onSubmit: (evt?: any) => void;
};

export interface FieldArrayState {
	name: string;
}

// Если возвращает строку - это означает, что есть ошибка. undefined означает, что ошибки нет
export type ValidateFunc<ValueType = any> = (
	value: ValueType,
	fieldName?: string,
	getFieldValueByName?: (name: string) => any,
) => string | undefined;

export type ReusableValidator<CheckType, ValueType = any> = (
	getMessage?:
		| null
		| undefined
		| string
		| ((value: ValueType, forCheck: CheckType) => string),
	forCheck?: CheckType,
) => ValidateFunc<ValueType>;

export type FieldOuterProps<
	FormState extends Record<string, any> = Record<string, any>,
> = {
	name: keyof FormState;
	defaultValue?: any;
	validate?:
		| ValidateFunc<FormState[keyof FormState]>
		| Array<ValidateFunc<FormState[keyof FormState]>>;
};

export type FieldResProps<
	FormState extends Record<string, any> = Record<string, any>,
	FieldCustomProps extends Record<string, any> = Record<string, any>,
> = FieldCustomProps & FieldOuterProps<FormState>;

export type FieldHiddenProps<T = HTMLInputElement> = {
	inputRef: MutableRefObject<T>;
};

export type FieldInnerProps<
	Input extends HTMLElement = HTMLInputElement,
	ValueType = any,
> = FieldHiddenProps<Input> & FieldMeta<ValueType>;

export type FieldProps<
	FieldCustomProps extends Record<string, any> = {name: string},
	Input extends HTMLElement = HTMLInputElement,
	ValueType = any,
> = FieldCustomProps & FieldInnerProps<Input, ValueType>;

export type FieldOptions = {
	fieldType?: FieldType;
	hideErrorInXSec?: false | number;
};

export type FieldArrayHiddenProps<
	Item extends Record<string, any> = Record<string, any>,
> = {
	listRef: MutableRefObject<HTMLElement>;
	list: ListInterface<Item>;
};

export type FieldArrayInnerProps<
	Item extends Record<string, any> = Record<string, any>,
> = FieldArrayHiddenProps<Item> & FieldMeta<Item>;

export type FieldArrayProps<
	FieldCustomProps extends Record<string, any> = Record<string, unknown>,
	ArrayItemProps extends Record<string, any> = Record<string, any>,
> = FieldCustomProps & FieldArrayInnerProps<ArrayItemProps>;
