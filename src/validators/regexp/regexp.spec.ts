import {regexp} from '~/validators';

describe('regexp()', () => {
	it('this values must throw error', () => {
		expect(regexp(null, /\d+/)('wrong text')).toEqual(
			'"wrong text" не соответсвует регулярному выражению /\\d+/',
		);
	});
	it('this values must pass without any errors', () => {
		expect(regexp(null, /^[a-zA-Z]+$/)('this')).toBeUndefined();
	});
});
