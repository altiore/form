import {comparePassword} from '~/validators';

describe('comparePassword()', () => {
	it('Пароль не совпадает', () => {
		expect(
			comparePassword(null, 'password')(
				'pestPassasword',
				'',
				() => 'testPassword',
			),
		).toEqual('Пароль не совпадает');
	});
	it('Пароль совпадает', () => {
		expect(
			comparePassword(null, 'password')(
				'testPassword',
				'',
				() => 'testPassword',
			),
		).toBeUndefined();
	});
	it('Некорректные данные, которые должны выдать ошибку пользователю', () => {
		expect(comparePassword(null, undefined)).toThrow(Error);
	});
});
