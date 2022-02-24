import {isRequired} from '~/validators';

describe('isRequired()', () => {
	it('Ничего не ввели', () => {
		expect(isRequired(null)('')).toEqual('Обязательное поле ввода');
	});

	it('Ввели текст', () => {
		expect(isRequired(null)('Some text')).toBeUndefined();
	});
	it('Некорректный text, который должен выдать ошибку пользователю', () => {
		expect(isRequired(null, undefined)).toThrow(Error);
	});
});
