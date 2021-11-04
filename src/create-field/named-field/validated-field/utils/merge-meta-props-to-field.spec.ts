import {FieldMeta} from '~/@common/types';

import {mergeMetaPropsToField} from './merge-meta-props-to-field';

describe('mergeMetaPropsToField()', () => {
	it('first', () => {
		const fieldMeta: FieldMeta = {
			defaultValue: undefined,
			errors: [],
			items: undefined,
			name: 'second',
			setErrors: jest.fn(),
		};
		const fieldProps: any = {
			defaultValue: 'test',
			errors: [],
			items: undefined,
			label: 'Second',
			name: 'second',
		};
		expect(
			JSON.stringify(mergeMetaPropsToField(fieldMeta, fieldProps)),
		).toEqual(
			JSON.stringify({
				defaultValue: 'test',
				errors: [],
				items: undefined,
				label: 'Second',
				name: 'second',
				setErrors: jest.fn(),
			}),
		);
	});
	it('second', () => {
		const fieldMeta: FieldMeta = {
			defaultValue: 'MUST BE',
			errors: [],
			items: undefined,
			name: 'second',
			setErrors: jest.fn(),
		};
		const fieldProps: any = {
			defaultValue: 'test',
			errors: [],
			items: undefined,
			label: 'Second',
			name: 'second',
		};
		expect(
			JSON.stringify(mergeMetaPropsToField(fieldMeta, fieldProps)),
		).toEqual(
			JSON.stringify({
				defaultValue: 'MUST BE',
				errors: [],
				items: undefined,
				label: 'Second',
				name: 'second',
				setErrors: jest.fn(),
			}),
		);
	});
});
