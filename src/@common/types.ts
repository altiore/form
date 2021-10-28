export interface ListItem {
	key: string;
	append: () => void;
	prepend: () => void;
	remove: () => void;
}

export interface ListInterface {
	map: (arg: (el: ListItem, index: number) => JSX.Element) => JSX.Element[];
	add: (index?: any) => void;
	remove: (index: number) => void;
}

export type RegisterField = (
	fieldName: string,
	isArray?: boolean,
	prevList?: any,
) => void;

export type SetErrors = (name: string, errors: string[] | undefined) => void;

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
	setErrors: SetErrors;
}

export interface ArrayFieldState {
	name: string;
}
