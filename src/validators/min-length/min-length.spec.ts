import {minLength as rawMinLength} from '~/validators';

const minLength = rawMinLength.bind(undefined, null);

describe('minLength()', () => {
	it('Некорректные данные, которые должны выдать ошибку пользователю', () => {
		expect(minLength(15)('wrong text')).toEqual(
			'Минимальная длина введенного значения - 15',
		);
	});
	it('Корректные данные', () => {
		expect(minLength(5)('this is normal text')).toBeUndefined();
	});
	it('Длина не должна быть меньше 0', () => {
		expect(() => minLength(-1)('the text doesnt matter')).toThrow(
			`Заданная длина не может быть меньше нуля`,
		);
	});
});
