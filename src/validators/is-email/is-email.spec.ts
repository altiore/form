import {isEmail} from './is-email';

describe('isEmail()', () => {
	it('Value is email', () => {
		expect(isEmail()('myLongLognLogn@email.ru')).toBeUndefined();
		expect(isEmail()('anotherEmail@email.com')).toBeUndefined();
		expect(isEmail()('anotherEmail+1@email.com')).toBeUndefined();
	});
	it('Value is not email', () => {
		expect(isEmail()('im a text')).toEqual('im a text is not an email');
		expect(isEmail()('567+45674')).toEqual('567+45674 is not an email');
		expect(isEmail()('5545:number')).toEqual('5545:number is not an email');
	});
});
