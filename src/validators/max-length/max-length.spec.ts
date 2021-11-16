import {maxLength} from '~/validators';

describe('maxLength()', () => {
	it('Корретные значения', () => {
		expect(maxLength(5)('norm')).toBeUndefined();
	});
	it('Некорректные данные', () => {
		expect(maxLength(5)('text that more than 5 chars')).toEqual({
			error: new Error('Максимальная длина введенного значения - 5'),
			value: 'text that more than 5 chars',
		});
	});
	it('Длина должна быть больше 0', () => {
		expect(() => maxLength(-1)('the text doesnt matter')).toThrow(
			`Param 'length' cannot be less than 0`,
		);
	});
});
