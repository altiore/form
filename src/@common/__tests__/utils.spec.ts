import {FieldType} from '~/@common/types';
import {getInputTypeByFieldType} from '~/@common/utils';

describe('@common/utils', () => {
	it('input type из FieldType.BOOLEAN', () => {
		expect(getInputTypeByFieldType(FieldType.BOOLEAN)).toBe('checkbox');
	});

	it('input type из FieldType.TEXT', () => {
		expect(getInputTypeByFieldType(FieldType.TEXT)).toBe('text');
	});

	it('input type из FieldType.FLOAT', () => {
		expect(getInputTypeByFieldType(FieldType.FLOAT)).toBe('number');
	});

	it('input type из FieldType.NUMBER', () => {
		expect(getInputTypeByFieldType(FieldType.NUMBER)).toBe('number');
	});

	it('input type из FieldType.SELECT_MULTIPLE', () => {
		// TODO: точно так должно быть?
		expect(getInputTypeByFieldType(FieldType.SELECT_MULTIPLE)).toBe(
			FieldType.SELECT_MULTIPLE,
		);
	});

	it('input type из FieldType.SELECT', () => {
		// TODO: точно так должно быть?
		expect(getInputTypeByFieldType(FieldType.SELECT)).toBe(FieldType.SELECT);
	});

	it('input type из FieldType.ARRAY', () => {
		// TODO: точно так должно быть?
		expect(getInputTypeByFieldType(FieldType.ARRAY)).toBe(FieldType.ARRAY);
	});

	it('input type из FieldType.CHECKBOX', () => {
		expect(getInputTypeByFieldType(FieldType.CHECKBOX)).toBe('checkbox');
	});

	it('input type из FieldType.EMAIL', () => {
		expect(getInputTypeByFieldType(FieldType.EMAIL)).toBe('email');
	});

	it('input type из FieldType.PASSWORD', () => {
		expect(getInputTypeByFieldType(FieldType.PASSWORD)).toBe('password');
	});

	it('input type из FieldType.ENUM', () => {
		expect(getInputTypeByFieldType(FieldType.ENUM)).toBe('text');
	});
});
