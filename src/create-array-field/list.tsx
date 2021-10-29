import React from 'react';

import {ArrayFieldContext} from '~/@common/array-field-context';
import {ListInterface, ListItem, RegisterField} from '~/@common/types';

export class List implements ListInterface {
	private list: number[] = [];
	private readonly prefix: string;
	private readonly registerField: RegisterField;

	constructor(
		registerField: RegisterField,
		defaultValue: any[] = [],
		prefix: string,
		prevList: any[],
	) {
		this.registerField = registerField;
		this.list = prevList ?? defaultValue.map((_, index) => index);
		this.prefix = prefix;
	}

	add = (index?: number, offset?: number): void => {
		const newList = [...this.list];
		const lastElement = newList.sort((a, b) => a - b)[this.list.length - 1];
		const indexOf = this.list.indexOf(index);
		if (typeof index === 'number') {
			this.list = [
				...this.list.slice(0, indexOf + offset),
				lastElement + 1,
				...this.list.slice(indexOf + offset),
			];
		} else {
			this.list.push(lastElement === undefined ? 0 : lastElement + 1);
		}

		this.registerField(this.prefix, true, this.list);
	};

	map = (
		callback: (el: ListItem, index: number) => JSX.Element,
	): JSX.Element[] => {
		return this.list.map((index) => {
			const name = `${this.prefix}.${index}`;
			return (
				<ArrayFieldContext.Provider key={name} value={{name}}>
					{callback(
						{
							append: () => this.add(index, 1),
							key: name,
							prepend: () => this.add(index, 0),
							remove: () => this.remove(index),
						},
						index,
					)}
				</ArrayFieldContext.Provider>
			);
		});
	};

	remove = (indexForRemove: number): void => {
		this.list = this.list.filter((index) => indexForRemove !== index);
		this.registerField(this.prefix, true, this.list);
	};
}
