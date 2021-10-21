import {maxLength} from './max-length';

describe('max length pass', () => {
	it('Value that must pass', () => {
		expect(maxLength(5)('norm')).toBeUndefined();
	});
	it("Value, that's throws error", () => {
		expect(maxLength(5)('text that more than 5 chars')).toEqual(
			'The length of the entered value should be no more than 5 characters',
		);
	});
	it('Length cannot be less than 0', () => {
		expect(maxLength(-1)('the text doesnt matter')).toEqual(
			`Param 'length' cannot be less than 0`,
		);
	});
});
