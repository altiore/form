export interface ListItem {
	name: string;
	append: () => void;
	prepend: () => void;
	remove: () => void;
}

export interface ListInterface {
	map: <T = JSX.Element>(
		arg: (el: ListItem, index: number) => T,
	) => T[];
	add: (index?: number) => void;
	remove: (index: number) => void;
}

export type RegisterField = (fieldName: string, isArray?: boolean, prevList?: any) => void;

export interface FormContextState {
	defaultValues: Record<string, any>;
	errors: Record<string, string[]>;
	fields: Record<string, {
		registered: boolean;
		list?: ListInterface;
	}>;
	registerField: RegisterField;
}
