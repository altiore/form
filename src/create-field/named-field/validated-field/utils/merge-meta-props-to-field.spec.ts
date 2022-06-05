import {FieldMeta} from '~/@common/types';

import {mergeMetaPropsToField} from './merge-meta-props-to-field';

describe('mergeMetaPropsToField()', () => {
	it('first', () => {
		const fieldMeta: FieldMeta = {
			defaultValue: undefined,
			error: undefined,
			errors: [],
			isInvalid: false,
			items: undefined,
			name: 'second',
			setErrors: jest.fn(),
			validators: [],
			warning: undefined,
			warnings: [],
		};
		const fieldProps: any = {
			defaultValue: 'test',
			errors: [],
			items: undefined,
			label: 'Second',
			name: 'second',
		};
		expect(mergeMetaPropsToField(fieldProps, fieldMeta)).toMatchObject({
			defaultValue: 'test',
			error: undefined,
			errors: expect.any(Array),
			isInvalid: false,
			items: undefined,
			label: 'Second',
			name: 'second',
			setErrors: expect.any(Function),
		});
	});
	it('second', () => {
		const fieldMeta: FieldMeta = {
			defaultValue: 'MUST BE',
			error: undefined,
			errors: [],
			isInvalid: false,
			items: undefined,
			name: 'second',
			setErrors: jest.fn(),
			validators: [],
			warning: undefined,
			warnings: [],
		};
		const fieldProps: any = {
			defaultValue: 'test',
			errors: [],
			items: undefined,
			label: 'Second',
			name: 'second',
		};
		expect(mergeMetaPropsToField(fieldProps, fieldMeta)).toMatchObject({
			defaultValue: 'MUST BE',
			error: undefined,
			errors: expect.any(Array),
			isInvalid: false,
			items: undefined,
			label: 'Second',
			name: 'second',
			setErrors: expect.any(Function),
		});
	});
});
