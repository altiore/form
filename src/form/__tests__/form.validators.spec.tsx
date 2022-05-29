import React from 'react';
import ReactDOM, {unmountComponentAtNode} from 'react-dom';
import {Simulate, act} from 'react-dom/test-utils';

import {FieldProps, FieldType} from '~/@common/types';
import {createField} from '~/create-field/create-field';
import {Form} from '~/form';

type IField = {
	label?: string;
};

const FieldView = ({fieldProps, inputProps}: FieldProps<IField>) => {
	return (
		<div>
			<span>{inputProps.name}</span>
			<input {...inputProps} />
			<span>{fieldProps.error}</span>
		</div>
	);
};

const Field = {
	Password: createField<IField>({fieldType: FieldType.PASSWORD}, FieldView),
};

const validateSpy = jest.fn();

const FormParent = ({name, onSubmit}: any) => {
	return (
		<Form id={name} onSubmit={onSubmit}>
			<Field.Password name="password" />
			<Field.Password name="password2" validate={validateSpy} />
			<button type="submit">Отправить</button>
		</Form>
	);
};

describe('~/form validators', () => {
	let container: any = null;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
		jest.useFakeTimers();
	});

	afterEach(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});

	it('событие blur компонента поля вызывает валидацию с правильными параметрами', async () => {
		const onSubmitFn = jest.fn();
		act(() => {
			ReactDOM.render(
				<FormParent name="foo" onSubmit={onSubmitFn} />,
				container,
			);
		});

		const pasField = container?.querySelector('[name="password"]');
		const comparePassField = container?.querySelector('[name="password2"]');
		pasField.value = '12345678';
		comparePassField.value = 'wrong';
		await act(async () => {
			comparePassField.dispatchEvent(
				new window.MouseEvent('blur', {bubbles: true}),
			);
		});

		expect(validateSpy).toHaveBeenCalledWith(
			'wrong',
			'password2',
			expect.any(Function),
		);
	});

	it('событие submit формы вызывает валидацию с правильными параметрами', async () => {
		const onSubmitFn = jest.fn();
		act(() => {
			ReactDOM.render(
				<FormParent name="foo" onSubmit={onSubmitFn} />,
				container,
			);
		});

		const pasField = container?.querySelector('[name="password"]');
		const comparePassField = container?.querySelector('[name="password2"]');
		pasField.value = '12345678';
		comparePassField.value = 'wrong';
		const form = container?.querySelector('form');
		await act(async () => {
			await Simulate.submit(form);
		});

		expect(validateSpy).toHaveBeenCalledWith(
			'wrong',
			'password2',
			expect.any(Function),
		);
	});
});
