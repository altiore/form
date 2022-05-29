import {isTrue} from './is-true';

describe('isTrue()', () => {
	it('Пустая строка', () => {
		expect(isTrue()('')).toEqual('Нужно принять условия');
	});

	it('Ложь', () => {
		expect(isTrue()(false)).toEqual('Нужно принять условия');
	});

	it('Истина', () => {
		expect(isTrue()(true)).toBeUndefined();
	});
});
