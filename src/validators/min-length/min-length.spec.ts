import {minLength} from '~/validators';

describe('minLength()', () => {
	it('Некорректные данные, которые должны выдать ошибку пользователю', () => {
		expect(minLength(15).validate('wrong text')).toEqual({
			error: new Error(
				'The length of the entered value should be more than 15 characters',
			),
			value: 'wrong text',
		});
	});
	it('Корректные данные', () => {
		expect(minLength(5).validate('this is normal text')).toBeUndefined();
	});
	it('Длина не должна быть меньше 0', () => {
		expect(() => minLength(-1).validate('the text doesnt matter')).toThrow(
			`Param 'length' cannot be less than 0`,
		);
	});
});
