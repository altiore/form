import {List} from './list';

describe('List()', () => {
	it('this test must pass', () => {
		const items = ['0', '1','2','3','4'];
		const list = new List(items, 'numbers');

		list.map((element) => {
			if (element.name == '0') {
				element.prepend()
			}
		})
		console.log(list);
	});
});
