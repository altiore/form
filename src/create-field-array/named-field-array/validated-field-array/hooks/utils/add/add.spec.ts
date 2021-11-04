import {InsertPosition} from '~/@common/types';

import {add} from './add';

describe('add util test', () => {
	it('Добавление ДО и ПОСЛЕ', () => {
		const list: number[] = [0, 1, 2, 3, 4];
		expect(add(list, '', 1, InsertPosition.AFTER)).toEqual([0, 1, 5, 2, 3, 4]);
		expect(add(list, '', 1, InsertPosition.BEFORE)).toEqual([0, 5, 1, 2, 3, 4]);
	});
	it('Если массив пустой, то элемент должен просто добавится', () => {
		const list: number[] = [];
		expect(add(list, '', {})).toEqual([0]);
	});
	it('Если индекс не передан, то добавить элемент в конец', () => {
		const list: number[] = [0];
		expect(add(list, '', {})).toEqual([0, 1]);
	});
});
