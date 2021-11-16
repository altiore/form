import {minLength} from '~/validators';

describe('minLength()', () => {
	it('Некорректные данные, которые должны выдать ошибку пользователю', () => {
		expect(minLength(15)('wrong text')).toEqual({
			error: new Error('Минимальная длина введенного значения - 15'),
			value: 'wrong text',
		});
	});
	it('Корректные данные', () => {
		expect(minLength(5)('this is normal text')).toBeUndefined();
	});
	it('Длина не должна быть меньше 0', () => {
		expect(() => minLength(-1)('the text doesnt matter')).toThrow(
			`Param 'length' cannot be less than 0`,
		);
	});
});
