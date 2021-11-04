import {remove} from './remove';

describe('remove util test', () => {
	it('Обычное удаление элемента', () => {
		const list: number[] = [0, 1, 2, 3, 4];
		expect(remove(list, '', 1)).toEqual([0, 2, 3, 4]);
		expect(remove(list, '', 0)).toEqual([1, 2, 3, 4]);
	});
	it('Удаление элемента в пустом массиве', () => {
		const list: number[] = [];
		expect(remove(list, '', 0)).toEqual([]);
		expect(remove(list, '', 5)).toEqual([]);
	});
	it('Удаление элемента с несуществующим индексом', () => {
		const list: number[] = [0, 1, 2];
		expect(remove(list, '', 5)).toEqual(list);
		expect(remove(list, '', 20)).toEqual(list);
		expect(remove(list, '', -2)).toEqual(list);
	});
});
