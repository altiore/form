import {FieldType} from '~/@common/types';
import {formatPhone, getInputTypeByFieldType} from '~/@common/utils';

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

	describe('formatPhone', () => {
		it('пустая строка должна остаться неизменной', () => {
			expect(formatPhone('')).toBe('');
		});

		it('только начало номера, начинающееся с 7', () => {
			expect(formatPhone('7')).toBe('+7');
		});

		it('только начало номера, начинающееся с +7', () => {
			expect(formatPhone('+7')).toBe('+7');
		});

		it('только начало номера, начинающееся с 7 с пробелом', () => {
			expect(formatPhone('7 ')).toBe('+7 ');
		});

		it('только начало номера, начинающееся с +7 с пробелом', () => {
			expect(formatPhone('+7 ')).toBe('+7 ');
		});

		it('первые 2 цифры', () => {
			expect(formatPhone('+7 9')).toBe('+7 (9');
		});

		it('первые 3 цифры', () => {
			expect(formatPhone('+7 (98')).toBe('+7 (98');
		});

		it('первые 4 цифры', () => {
			expect(formatPhone('+7 (988')).toBe('+7 (988');
		});

		it('первые 5 цифр', () => {
			expect(formatPhone('+7 (9885')).toBe('+7 (988) 5');
		});

		it('первые 4 цифры после удаления 5-ой', () => {
			expect(formatPhone('+7 (988) ')).toBe('+7 (988) ');
		});

		it('первые 4 цифры после удаления 5-ой без пробела', () => {
			expect(formatPhone('+7 (988)')).toBe('+7 (988)');
		});

		it('третья секция цифр - 2 цифры', () => {
			expect(formatPhone('+7 (988) 55')).toBe('+7 (988) 55');
		});

		it('третья секция цифр - 3 цифры', () => {
			expect(formatPhone('+7 (988) 555')).toBe('+7 (988) 555');
		});

		it('четвертая секция цифр - 1 цифры', () => {
			expect(formatPhone('+7 (988) 5552')).toBe('+7 (988) 555 - 2');
		});

		it('четвертая секция цифр - 0 цифр', () => {
			expect(formatPhone('+7 (988) 555 - ')).toBe('+7 (988) 555 - ');
		});

		it('четвертая секция цифр - 0 цифр без пробела', () => {
			expect(formatPhone('+7 (988) 555 -')).toBe('+7 (988) 555 -');
		});

		it('четвертая секция цифр - 0 цифр без пробела и тире', () => {
			expect(formatPhone('+7 (988) 555 ')).toBe('+7 (988) 555 ');
		});

		it('четвертая секция цифр - 2 цифры', () => {
			expect(formatPhone('+7 (988) 55522')).toBe('+7 (988) 555 - 22');
		});

		it('последняя секция', () => {
			expect(formatPhone('+7 (988) 555 - 22 - 11')).toBe(
				'+7 (988) 555 - 22 - 11',
			);
		});

		it('последняя секция без конца - 1', () => {
			expect(formatPhone('+7 (988) 555 - 22 - 1')).toBe(
				'+7 (988) 555 - 22 - 1',
			);
		});

		it('последняя секция без конца - 2', () => {
			expect(formatPhone('+7 (988) 555 - 22 - ')).toBe('+7 (988) 555 - 22 - ');
		});

		it('последняя секция без конца - 3', () => {
			expect(formatPhone('+7 (988) 555 - 22 -')).toBe('+7 (988) 555 - 22 -');
		});

		it('последняя секция без конца - 4', () => {
			expect(formatPhone('+7 (988) 555 - 22 ')).toBe('+7 (988) 555 - 22 ');
		});

		it('последняя секция без конца - 5', () => {
			expect(formatPhone('+7 (988) 555 - 22')).toBe('+7 (988) 555 - 22');
		});

		it('произвольный формат 1', () => {
			expect(formatPhone('+7 (988) 555 - 2211')).toBe('+7 (988) 555 - 22 - 11');
		});

		it('произвольный формат 2', () => {
			expect(formatPhone('79885552211')).toBe('+7 (988) 555 - 22 - 11');
		});

		it('произвольный формат 3', () => {
			expect(formatPhone('7(988)5552211')).toBe('+7 (988) 555 - 22 - 11');
		});

		it('произвольный формат 4', () => {
			expect(formatPhone('7(988)555-2211')).toBe('+7 (988) 555 - 22 - 11');
		});

		it('произвольный формат 5', () => {
			expect(formatPhone('7(988)555-22-11')).toBe('+7 (988) 555 - 22 - 11');
		});
	});
});
