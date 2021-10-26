export interface ListInterface {
	map: <T = JSX.Element>(
		arg: (el: ListItem, index: number) => T,
	) => T[];
	add: (index?: number) => void;
	remove: (index: number) => void;
}

interface ListItem {
	name: string;
	append: () => void;
	prepend: () => void;
	remove: () => void;
}

export class List implements ListInterface {
	private list: number[] = [];
	private readonly prefix: string;

	constructor(defaultValue: any[] = [], prefix: string) {
		this.list = defaultValue.map((_, index) => index);
		this.prefix = prefix;
	}

	add(index?: any): void {
		this.list.push(this.list.length)
	}

	map<T = JSX.Element>(callback: ((el: ListItem, index: number) => T)): T[] {
		return this.list.map((index) => callback({
			name: `${this.prefix}.${index}`,
			append: () => this.add(index),
			prepend: () => this.add(index - 1),
			remove: () => this.remove(index),
		}, index));
	}

	remove(index: number): void {
		this.list = this.list.filter((_, indx) => indx != index);
	}
}
