import {regexp} from './regexp';

describe('regexp()', () => {
	it('this values must throw error', () => {
		expect(regexp(/\d+/)('wrong text')).toEqual(expect.any(String));
		expect(regexp(/\[A-Z]/)('4323445')).toEqual(expect.any(String));
	});
	it('this values must pass without any errors', () => {
		expect(regexp(/^[a-zA-Z]+$/)('this')).toBeUndefined();
		expect(regexp(/\d+/)('5453675')).toBeUndefined();
	});
});
