import {comparePassword} from '~/validators';

describe('comparePassword()', () => {
	it('Пароли не совпадают', () => {
		expect(
			comparePassword(null, 'password')(
				'pestPassasword',
				'',
				() => 'testPassword',
			),
		).toEqual('Пароли не совпадают');
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
