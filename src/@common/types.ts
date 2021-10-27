export interface ListItem {
	name: string;
	index: number;
	append: () => void;
	prepend: () => void;
	fieldName: (name: string) => string;
	remove: () => void;
}

export interface ListInterface {
	map: <T = JSX.Element>(arg: (el: ListItem, index: number) => T) => T[];
	add: (index?: any) => void;
	remove: (index: number) => void;
}

export type RegisterField = (
	fieldName: string,
	isArray?: boolean,
	prevList?: any,
) => void;

export interface FormContextState {
	defaultValues: Record<string, any>;
	errors: Record<string, string[]>;
	fields: Record<
		string,
		{
			registered: boolean;
			list?: ListInterface;
		}
	>;
	registerField: RegisterField;
}
