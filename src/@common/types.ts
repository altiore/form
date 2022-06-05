import {ButtonHTMLAttributes, MouseEventHandler, MutableRefObject} from 'react';

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
	PHONE = 'phone',
	PASSWORD = 'password',
	TEXT = 'text',
	EMAIL = 'email',
	SELECT = 'select',
	SELECT_MULTIPLE = 'select-multiple',
}

// TODO: не уверен на счет 'button'
export type InputType =
	| 'button'
	| 'checkbox'
	| 'color'
	| 'date'
	| 'datetime'
	| 'datetime-local'
	| 'email'
	| 'file'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'password'
	| 'radio'
	| 'range'
	| 'reset'
	| 'search'
	| 'submit'
	| 'text'
	| 'tel'
	| 'time'
	| 'url'
	| 'week';

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
) => () => void;

export type SetErrors = (name: string, errors: string[] | undefined) => void;

export enum FieldMetaName {
	NAME = 'name',
	DEFAULT_VALUE = 'defaultValue',
	ERRORS = 'errors',
	ITEMS = 'items',
	SET_ERRORS = 'setErrors',
	FIELD_TYPE = 'fieldType',
	IS_UNTOUCHED = 'isUntouched',
	IS_INVALID = 'isInvalid',
	ERROR = 'error',
	VALIDATORS = 'validators',
}

export enum IgnoredProp {
	INPUT_PROPS = 'inputProps',
	FIELD_PROPS = 'fieldProps',
}

export type FieldMeta<ValueType = any> = {
	[FieldMetaName.NAME]: string;
	[FieldMetaName.DEFAULT_VALUE]?: ValueType;
	[FieldMetaName.ERRORS]: string[];
	// массив номеров в порядке, в котором элементы массива расположены на экране
	// используюет только для fieldType === FieldType.ARRAY
	[FieldMetaName.ITEMS]?: number[];
	[FieldMetaName.SET_ERRORS]: (errors: string[], force?: boolean) => void;
	[FieldMetaName.FIELD_TYPE]?: FieldType;
	[FieldMetaName.IS_UNTOUCHED]?: boolean;

	// избыточные поля, которые нужны ТОЛЬКО для удобства
	[FieldMetaName.IS_INVALID]: boolean;
	[FieldMetaName.ERROR]?: string;
	[FieldMetaName.VALIDATORS]: Array<ValidateFunc>;
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

export type FieldInputProps<ValueType> = {
	type: InputType;
	defaultValue?: ValueType extends boolean ? undefined : ValueType;
	defaultChecked?: ValueType extends boolean ? ValueType : undefined;
	name: string;
	value?: 'on' | undefined;
	multiple?: true;
};

export type FieldInnerProps<
	Input extends HTMLElement = HTMLInputElement,
	ValueType = any,
> = {
	[IgnoredProp.FIELD_PROPS]: FieldMeta<ValueType> & FieldHiddenProps<Input>;
	[IgnoredProp.INPUT_PROPS]: FieldInputProps<ValueType>;
};

export type FieldProps<
	FieldCustomProps extends Record<string, any> = {name: string},
	Input extends HTMLElement = HTMLInputElement,
	ValueType = any,
> = FieldCustomProps & FieldInnerProps<Input, ValueType>;

export type FieldOptions = {
	fieldType?: FieldType;
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

export interface SubmitInnerProps<El = HTMLButtonElement>
	extends ButtonHTMLAttributes<El> {
	isInvalid: boolean;
	isSubmitting: boolean;
	isUntouched: boolean;
}

export interface SubmitOuterProps {
	children?: any;
	onSubmit?: (values: any) => Promise<any>;
}

export type SubmitProps<
	CustomSubmitProps extends Record<string, any> = Record<string, any>,
	El = HTMLButtonElement,
> = SubmitInnerProps<El> & CustomSubmitProps;
