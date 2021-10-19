import {minLength} from './min-length';

describe('minLength()', () => {
	it('this test mustnt pass', () => {
		expect(minLength(15)('wrong text')).toEqual(
			`The length of the entered value should be no more than 15 characters`,
		);
	});
	it('this test must pass', () => {
		expect(minLength(5)('this is normal text')).toBeUndefined();
	});
	it('Length cannot be less than 0', () => {
		expect(minLength(-1)('the text doesnt matter')).toEqual(
			`Param 'length' cannot be less than 0`,
		);
	});
});
