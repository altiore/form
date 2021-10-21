import {isNumber} from './is-number';

describe('is-number()', () => {
	it('Value is number', () => {
		expect(isNumber()('4539575')).toBeUndefined();
		expect(isNumber()('-45654')).toBeUndefined();
	});
	it('Value is not number', () => {
		expect(isNumber()('im a text')).toEqual('The value is not a number');
		expect(isNumber()('567+45674')).toEqual('The value is not a number');
		expect(isNumber()('5545:number')).toEqual('The value is not a number');
	});
});
