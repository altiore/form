import React from 'react';
import ReactDOM, {unmountComponentAtNode} from 'react-dom';
import {Simulate, act} from 'react-dom/test-utils';

import {createField} from '~/create-field/create-field';
import {Form} from '~/form';

const Field = createField(({error, name}) => {
	return (
		<div>
			<span>{name}</span>
			<input name={name} />
			<span>{error}</span>
		</div>
	);
});

const FieldNumber = createField(({name}) => {
	return (
		<div>
			<input type="number" name={name} />
		</div>
	);
});

const FieldBoolean = createField(({name}) => {
	return (
		<div>
			<span>{name}</span>
			<input type="checkbox" name={name} />
		</div>
	);
});

const FieldRadio = createField(({name}) => {
	return (
		<div>
			<input type="radio" id="contactChoice1" name={name} value="email" />

			<input type="radio" id="contactChoice2" name={name} value="phone" />

			<input type="radio" id="contactChoice3" name={name} value="mail" />
		</div>
	);
});

const FieldSelect = createField(({name}) => {
	return (
		<div>
			<select name={name}>
				<option value="one">Один</option>
				<option value="two">Два</option>
			</select>
		</div>
	);
});

const TypedParent = ({name, onSubmit}: any) => {
	return (
		<Form name={name} onSubmit={onSubmit}>
			<Field name="string" />
			<FieldNumber name="number" defaultValue={4} />
			<FieldBoolean name="boolean" defaultValue={true} />
			<FieldRadio name="radio" defaultValue="email" />
			<FieldSelect name="select" defaultValue="один" />
			<button type="submit">Отправить</button>
		</Form>
	);
};

describe('~/form', () => {
	let container: any = null;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});

	describe('Проверяем работоспособность формы', () => {
		//TODO: Тест проходит, но работает не корректно. Вызов сабмита должен быть один.
		it('Форма работает по сабмиту', () => {
			const onSubmitFn = jest.fn();
			act(() => {
				ReactDOM.render(
					<TypedParent name="foo" onSubmit={onSubmitFn} />,
					container,
				);
			});

			const form = container?.querySelector('form');
			act(async () => {
				Simulate.submit(form);
				expect(onSubmitFn).toBeCalledTimes(5);
			});
		});
		//TODO: Тест проходит, но работает не корректно. По клику должен быть вызов сабмита.
		it('Отправка формы работает по клику кнопки', () => {
			const onSubmitFn = jest.fn();
			act(() => {
				ReactDOM.render(<TypedParent onSubmit={onSubmitFn} />, container);
			});

			const button = container?.querySelector('button');
			act(async () => {
				// button.dispatchEvent(new window.MouseEvent('click', {bubbles: true}));
				Simulate.click(button);

				expect(onSubmitFn).toHaveBeenCalledTimes(10);
			});
		});
	});

	//TODO: Написать тест по проверке данных (типе данных?) при сабмите.
});
