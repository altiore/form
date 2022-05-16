import React from 'react';
import ReactDOM, {unmountComponentAtNode} from 'react-dom';
import {Simulate, act} from 'react-dom/test-utils';

import {FieldMeta, FieldType} from '~/@common/types';
import {createField} from '~/create-field/create-field';
import {Form} from '~/form';

type FieldViewProps = FieldMeta;

const FieldView = ({defaultValue, error, name, type}: FieldViewProps) => {
	return (
		<div>
			<span>{name}</span>
			<input name={name} defaultValue={defaultValue} type={type} />
			<span>{error}</span>
		</div>
	);
};

const Field = {
	Boolean: createField({fieldType: FieldType.BOOLEAN}, FieldView),
	Number: createField({fieldType: FieldType.NUMBER}, FieldView),
	String: createField({fieldType: FieldType.TEXT}, FieldView),
};

const FormParent = ({name, onSubmit}: any) => {
	return (
		<Form id={name} onSubmit={onSubmit}>
			<Field.String name="string" />
			<Field.Number name="number" />
			<Field.Boolean name="boolean" />
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
		it('Форма работает по сабмиту', async () => {
			const onSubmitFn = jest.fn();
			act(() => {
				ReactDOM.render(
					<FormParent name="foo" onSubmit={onSubmitFn} />,
					container,
				);
			});

			const form = container?.querySelector('form');
			await act(async () => {
				await Simulate.submit(form);
			});
			expect(onSubmitFn).toHaveBeenCalledTimes(1);
		});

		it('Отправка формы работает по клику кнопки', async () => {
			const onSubmitFn = jest.fn();
			act(() => {
				ReactDOM.render(<FormParent onSubmit={onSubmitFn} />, container);
			});

			const button = container?.querySelector('button');
			await act(async () => {
				await Simulate.submit(button);
			});
			expect(onSubmitFn).toHaveBeenCalledTimes(1);
		});
	});

	describe('Проверяем типы данных из формы', () => {
		it('Строковое поле', async () => {
			const onSubmitFn = jest.fn();
			act(() => {
				ReactDOM.render(
					<FormParent name="foo" onSubmit={onSubmitFn} />,
					container,
				);
			});

			const form = container?.querySelector('form');
			const input = container?.querySelector(`[name="string"]`);
			input.value = '5';
			await act(async () => {
				await Simulate.submit(form);
			});

			expect(onSubmitFn).toHaveBeenCalledWith(
				expect.objectContaining({string: '5'}),
				expect.any(Function),
				expect.any(Object),
			);
		});

		it('Поле в виде цифры', async () => {
			const onSubmitFn = jest.fn();
			act(() => {
				ReactDOM.render(
					<FormParent name="foo" onSubmit={onSubmitFn} />,
					container,
				);
			});

			const form = container?.querySelector('form');
			const input = container?.querySelector(`[name="number"]`);
			input.value = '5';
			await act(async () => {
				await Simulate.submit(form);
			});
			expect(onSubmitFn).toHaveBeenCalledWith(
				expect.objectContaining({number: 5}),
				expect.any(Function),
				expect.any(Object),
			);
		});
	});
});
