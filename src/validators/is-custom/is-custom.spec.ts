import {isCustom} from './is-custom';

describe('isCustom()', () => {
	it('Value is normal cases', () => {
		expect(
			isCustom(
				(value: any) => !Number.isNaN(value),
				':value: is not number',
				(value: string) => +value,
			)('4539575'),
		).toBeUndefined();
		expect(
			isCustom(
				(value: any) => Number.isInteger(value),
				':value: is not integer',
				(value: string) => +value,
			)('4539575'),
		).toBeUndefined();
		expect(
			isCustom(
				(value: any) => value.length > 2,
				'The value length more than 2 chars (now :value:)',
			)('long text'),
		).toBeUndefined();
	});
	it('Value wrong cases', () => {
		expect(
			isCustom(
				(value: any) => !Number.isNaN(value),
				':value: is not number',
				(value: string) => +value,
			)('text'),
		).toEqual('text is not number');
		expect(
			isCustom(
				Number.isInteger,
				':value: is not integer',
				(value: string) => +value,
			)('5.4'),
		).toEqual('5.4 is not integer');
		expect(
			isCustom(
				(value: number) => value > 2,
				'The value length more than 2 chars (now :prepared:)',
				(value: string) => value.length,
			)('ye'),
		).toEqual('The value length more than 2 chars (now 2)');
	});
});
