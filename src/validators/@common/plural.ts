export function pluralNoun(
	num: number,
	one: string,
	few: string,
	many: string,
): string {
	const forms = [one, few, many];

	let str;

	switch (forms.length) {
		case 1:
			throw new Error('Not enough forms');
			break;

		case 2:
			str = num > 1 ? forms[1] : forms[0];
			break;

		default:
			str = forms[getNounPluralForm(num)];
			break;
	}

	return str.replace(/%d/g, String(num));
}

export function pluralVerb(
	num: number,
	one: string,
	few: string,
	many: string,
): string {
	const forms = [one, few, many];
	const str = forms[getVerbPluralForm(num)];

	return str.replace(/%d/g, String(num));
}

function getVerbPluralForm(a: number): number {
	if (a > 1000000) {
		return 2;
	}

	if (a > 1000 && a < 1000000 && /000$/.test(String(a))) {
		a /= 1000;
	}

	if ((a % 10 === 1 && a % 100 !== 11) || /1000$/.test(a.toString())) {
		return 0;
	} else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {
		return 1;
	} else {
		return 2;
	}
}

function getNounPluralForm(a: number): number {
	if (a % 10 === 1 && a % 100 !== 11) {
		return 0;
	} else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {
		return 1;
	} else {
		return 2;
	}
}
