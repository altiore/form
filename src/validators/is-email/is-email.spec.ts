import {isEmail} from '~/validators';

describe('isEmail()', () => {
	it('Некорректный email', () => {
		expect(isEmail(null)('testtest.com')).toEqual('Введите корректный email');
	});

	it('Корректный email', () => {
		expect(isEmail(null)('test@test.com')).toBeUndefined();
	});
	it('Некорректный email, который должен выдать ошибку пользователю', () => {
		expect(isEmail(null, undefined)).toThrow(Error);
	});
});
