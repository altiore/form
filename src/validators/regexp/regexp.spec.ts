import {regexp} from '~/validators';

describe('regexp()', () => {
	it('this values must throw error', () => {
		expect(regexp(/\d+/).validate('wrong text')).toEqual({
			error: new Error('wrong text does not fit the regular expression /\\d+/'),
			value: 'wrong text',
		});
	});
	it('this values must pass without any errors', () => {
		expect(regexp(/^[a-zA-Z]+$/).validate('this')).toBeUndefined();
	});
});
