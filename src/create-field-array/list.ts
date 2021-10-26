export interface ListInterface {
	map: <T>(
		arg: (el: ListItem, index: number) => any,
	) => T[];
	add: (index?: number) => void;
	remove: (index: number) => void;
}

interface ListItem {
	name: string;
	append?: () => void;
	prepend?: () => void;
	remove?: () => void;
}

export class List implements ListInterface {
	private list: number[] = [];
	private readonly prefix: string;

	constructor(defaultValue: any[] = [], prefix: string) {
		this.list = defaultValue.map((_, index) => index);
		this.prefix = prefix;
	}

	add(): void {
		this.list.push(this.list.length)
	}

	map<T>(arg: (el: ListItem, index: number) => any): T[] {
		return this.list.map((_,index) => arg()));
	}

	remove(index: number): void {
		this.list = this.list.filter((_, indx) => indx != index);
	}
}
