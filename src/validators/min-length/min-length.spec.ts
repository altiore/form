import {minLength as rawMinLength} from '~/validators';

const minLength = rawMinLength.bind(undefined, null);

describe('minLength()', () => {
	it('Минимум 1 символ', () => {
		expect(minLength(1)('')).toEqual('Минимум 1 символ');
	});
	it('Некорректные данные, которые должны выдать ошибку пользователю', () => {
		expect(minLength(15)('wrong text')).toEqual('Минимум 15 символов');
	});
	it('Минимум 2 символа', () => {
		expect(minLength(2)('')).toEqual('Минимум 2 символа');
	});
	it('Минимум 12 символа', () => {
		expect(minLength(12)('')).toEqual('Минимум 12 символов');
	});
	it('Минимум 23 символа', () => {
		expect(minLength(23)('')).toEqual('Минимум 23 символа');
	});
	it('Минимум 150 символа', () => {
		expect(minLength(150)('')).toEqual('Минимум 150 символов');
	});
	it('Корректные данные', () => {
		expect(minLength(5)('this is normal text')).toBeUndefined();
	});
	it('Длина не должна быть меньше 0', () => {
		expect(() => minLength(-1)('the text doesnt matter')).toThrow(
			`Заданная длина не может быть меньше нуля`,
		);
	});
	it('Длина', () => {
		expect(minLength(5)('12345')).toBeUndefined();
	});
});
