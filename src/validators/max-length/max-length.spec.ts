import {maxLength} from '~/validators';

describe('maxLength()', () => {
	it('Корретные значения', () => {
		expect(maxLength(null, 5)('norm')).toBeUndefined();
	});
	it('Некорректные данные', () => {
		expect(maxLength(null, 5)('text that more than 5 chars')).toEqual(
			'Максимальная длина введенного значения - 5',
		);
	});
	it('Длина должна быть больше 0', () => {
		expect(() => maxLength(null, -1)('the text doesnt matter')).toThrow(
			`Заданная длина не может быть меньше нуля`,
		);
	});
});
