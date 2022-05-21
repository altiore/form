export const forbiddenPropsError = (
	forbiddenProps: string[],
	name: string,
): void => {
	if (forbiddenProps.length) {
		const forbiddenPropsStr = forbiddenProps.map((el) => `"${el}"`).join(', ');
		const isOne = forbiddenProps.length === 1;
		console.error(
			`Свойств${isOne ? 'о' : 'а'} ${forbiddenPropsStr} компонента поля` +
				` формы с name="${name}" был${isOne ? 'о' : 'и'} проигнорирован${
					isOne ? 'о' : 'ы'
				}, т.к. библиотека @altiore/form использует свойства с аналогичными именами для внутренних нужд. Переименуйте свойств${
					isOne ? 'о' : 'а'
				} ${forbiddenPropsStr}, чтоб сохранить работоспособность компонента`,
		);
	}
};
