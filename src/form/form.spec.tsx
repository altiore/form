import React from 'react';
import ReactDOM from 'react-dom';
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
	Boolean: createField(FieldType.BOOLEAN, FieldView),
	Number: createField(FieldType.NUMBER, FieldView),
	String: createField(FieldType.TEXT, FieldView),
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
		document.body.removeChild(container);
		container = null;
	});

	describe('Проверяем работоспособность формы', () => {
		it('Форма работает по сабмиту', () => {
			const onSubmitFn = jest.fn();
			act(() => {
				ReactDOM.render(
					<FormParent name="foo" onSubmit={onSubmitFn} />,
					container,
				);
			});

			const form = container?.querySelector('form');
			act(() => {
				Simulate.submit(form);
			});
			expect(onSubmitFn).toHaveBeenCalledTimes(1);
		});

		it('Отправка формы работает по клику кнопки', () => {
			const onSubmitFn = jest.fn();
			act(() => {
				ReactDOM.render(<FormParent onSubmit={onSubmitFn} />, container);
			});

			const button = container?.querySelector('button');
			act(() => {
				Simulate.submit(button);
			});
			expect(onSubmitFn).toHaveBeenCalledTimes(1);
		});
	});

	describe('Проверяем типы данных из формы', () => {
		it('Строковое поле', () => {
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
			act(() => {
				Simulate.submit(form);
			});

			expect(onSubmitFn).toHaveBeenCalledWith(
				expect.objectContaining({string: '5'}),
				expect.any(Function),
			);
		});

		it('Поле в виде цифры', () => {
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
			act(() => {
				Simulate.submit(form);
			});

			expect(onSubmitFn).toHaveBeenCalledWith(
				expect.objectContaining({number: 5}),
				expect.any(Function),
			);
		});
	});
});
