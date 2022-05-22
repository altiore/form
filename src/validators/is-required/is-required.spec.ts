import {isRequired} from '~/validators';

describe('isRequired()', () => {
	it('Пустая строка', () => {
		expect(isRequired()('')).toEqual('Обязательное поле');
	});

	it('Строка с одними пробелами', () => {
		expect(isRequired()('   ')).toEqual('Обязательное поле');
	});

	it('null', () => {
		expect(isRequired()(null)).toEqual('Обязательное поле');
	});

	it('undefined', () => {
		expect(isRequired()(undefined)).toEqual('Обязательное поле');
	});

	it('NaN', () => {
		expect(isRequired()(NaN)).toEqual('Обязательное поле');
	});

	it('текст', () => {
		expect(isRequired()('Some text')).toBeUndefined();
	});

	it('число', () => {
		expect(isRequired()(5)).toBeUndefined();
	});

	it('объект (может быть и пустой)', () => {
		expect(isRequired()({})).toBeUndefined();
	});

	it('массив (может быть и пустой)', () => {
		expect(isRequired()([])).toBeUndefined();
	});
});
