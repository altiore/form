import {MouseEventHandler, MutableRefObject} from 'react';

/**
 * "button|checkbox|file|hidden|image|password|radio|reset|submit|text
 */
export enum FieldType {
	ARRAY = 'array',
	BOOLEAN = 'checkbox',
	CHECKBOX = 'checkbox',
	NUMBER = 'number',
	TEXT = 'text',
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

export interface ListItem {
	key: string;
	append: () => void;
	prepend: () => void;
	remove: () => void;
}

export type ListInterface<
	Item extends Record<string, any> = Record<string, any>,
> = {
	map: (arg: (el: ListItem, index: number) => JSX.Element) => JSX.Element[];
	add:
		| MouseEventHandler
		| (() => void)
		| ((item: Item, index?: number) => void);
	remove: (index: number) => void;
};

export type RegisterField = (fieldName: string, fieldType?: FieldType) => void;

export type SetErrors = (name: string, errors: string[] | undefined) => void;

export type FieldMeta<ValueType = any> = {
	name: string;
	defaultValue?: ValueType;
	errors: string[];
	// Array only for fieldType === FieldType.ARRAY
	items?: number[];
	setErrors: (errors: string[]) => void;
	type?: FieldType;
};

export type FormContextState = {
	fields: Record<string, FieldMeta>;
	formRef: MutableRefObject<HTMLFormElement>;
	registerField: RegisterField;
	setItems: (fieldName: string, setItems: (i: number[]) => number[]) => void;
};

export interface FieldArrayState {
	name: string;
}

export type ValidateFuncType = {
	validate: (value: any) => {error: Error; value: any} | undefined | any;
};
