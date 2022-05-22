import {toFlatErrors} from '~/form/form.utils';

describe('~/form.utils', () => {
	it('Правильная конвертация в плоские ошибки простого объекта', () => {
		const setErrorsSpy = jest.fn();
		toFlatErrors(
			{
				ingredients: ['Неверный ингредиент'],
			},
			setErrorsSpy,
		);

		expect(setErrorsSpy).toHaveBeenCalledWith('ingredients', [
			'Неверный ингредиент',
		]);
	});

	it('Правильная конвертация в плоские ошибки сложного вложенного объекта', () => {
		const setErrorsSpy = jest.fn();
		const errText =
			'amount должен быть числом, соответствующим указанным ограничениям';
		toFlatErrors(
			{
				ingredients: {
					'3': {
						amount: [errText],
					},
					'4': {
						amount: errText,
						items: {
							'0': {
								title: 'wrong',
							},
						},
					},
				},
			},
			setErrorsSpy,
		);

		expect(setErrorsSpy).toHaveBeenCalledWith('ingredients.3.amount', [
			errText,
		]);
		expect(setErrorsSpy).toHaveBeenCalledWith('ingredients.4.amount', [
			errText,
		]);
		expect(setErrorsSpy).toHaveBeenCalledWith('ingredients.4.items.0.title', [
			'wrong',
		]);
	});
});
