import {ListInterface, ListItem, RegisterField} from '~/@common/types';

export class List implements ListInterface {
	private list: number[] = [];
	private readonly prefix: string;
	private readonly registerField: RegisterField;

	constructor(registerField: RegisterField, defaultValue: any[] = [], prefix: string, prevList: any) {
		this.registerField = registerField;
		this.list = prevList ?? defaultValue.map((_, index) => index);
		this.prefix = prefix;
	}

	add = (index?: any): void => {
		this.list.push(this.list.length);
		this.registerField(this.prefix, true, this.list);
	}

	map = <T = JSX.Element>(callback: ((el: ListItem, index: number) => T)): T[] => {
		return this.list.map((index) => callback({
			append: () => this.add(index),
			name: `${this.prefix}.${index}`,
			prepend: () => this.add(index - 1),
			remove: () => this.remove(index),
		}, index));
	}

	remove = (indexForRemove: number): void => {
		this.list = this.list.filter((index) => indexForRemove !== index);
		this.registerField(this.prefix, true, this.list);
	}
}
