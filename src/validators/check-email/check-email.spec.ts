import {checkEmail} from '~/validators';

describe('checkEmail()', () => {
	it('Некорректный email', () => {
		expect(checkEmail(null)('testtest.com')).toEqual(
			'Введите корректный email',
		);
	});

	it('Корректный email', () => {
		expect(checkEmail(null)('test@test.com')).toBeUndefined();
	});
	it('Некорректный email, который должен выдать ошибку пользователю', () => {
		expect(checkEmail(null, undefined)).toThrow(Error);
	});
});
