import {isEmail} from '~/validators';

describe('isEmail()', () => {
	it('Некорректный email', () => {
		expect(isEmail(null)('testtest.com')).toEqual('Введите корректный email');
	});

	it('Корректный email', () => {
		expect(isEmail(null)('test@test.com')).toBeUndefined();
	});

	it('Пропускать проверку, если поле undefined', () => {
		expect(isEmail(null)(undefined)).toBeUndefined();
	});

	it('Не пропускать проверку, если поле null', () => {
		expect(isEmail(null)(null)).toEqual('Введите корректный email');
	});
});
