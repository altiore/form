import {MouseEventHandler, MutableRefObject} from 'react';

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

export type RegisterField = (fieldName: string, isArray: boolean) => void;

export type SetErrors = (name: string, errors: string[] | undefined) => void;

export type FieldMeta = {
	name: string;
	defaultValue?: any;
	errors: string[];
	items?: number[];
	setErrors: (errors: string[]) => void;
};

export type FormContextState = {
	fields: Record<string, FieldMeta>;
	registerField: RegisterField;
	getList: (fieldMeta: FieldMeta) => ListInterface;
	formRef: MutableRefObject<HTMLFormElement>;
};

export interface ArrayFieldState {
	name: string;
}

export type ValidateFuncType = (value: any) => string | undefined;
