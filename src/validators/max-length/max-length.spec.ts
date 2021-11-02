import {maxLength} from '~/validators';

describe('maxLength()', () => {
	it('Корретные значения', () => {
		expect(maxLength(5).validate('norm')).toBeUndefined();
	});
	it('Некорректные данные', () => {
		expect(maxLength(5).validate('text that more than 5 chars')).toEqual({
			error: new Error(
				'The length of the entered value should be no more than 5 characters',
			),
			value: 'text that more than 5 chars',
		});
	});
	it('Длина должна быть больше 0', () => {
		expect(() => maxLength(-1).validate('the text doesnt matter')).toThrow(
			`Param 'length' cannot be less than 0`,
		);
	});
});
