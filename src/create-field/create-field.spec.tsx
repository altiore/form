import React from 'react';
import ReactDOM, {unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';

import {mount} from 'enzyme';
import sinon from 'sinon';

import {createField} from '~/create-field/create-field';
import {Form} from '~/form';
import {isEmail} from '~/validators';

const memoizedRenderEvent = sinon.spy();
const Field = createField(({error, name}) => {
	memoizedRenderEvent();
	return (
		<div>
			<span>{name}</span>
			<input name={name} />
			<span>{error}</span>
		</div>
	);
});

const FieldMultiSelect = createField(({name}) => {
	return (
		<div>
			<select multiple name={name}>
				<option value="one">Один</option>
				<option value="two">Два</option>
				<option value="three">Три</option>
			</select>
		</div>
	);
});

const parentRenderEvent = sinon.spy();
const Parent = ({name}: any) => {
	parentRenderEvent();
	return (
		<Form onSubmit={console.log}>
			<span>{name}</span>
			<Field name="test" validators={[isEmail(null)]} />
			<FieldMultiSelect name="variants" />
		</Form>
	);
};

describe('~/create-field', () => {
	let container: any = null;
	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
		memoizedRenderEvent.resetHistory();
		parentRenderEvent.resetHistory();
	});

	describe('Не перерендеривать, если рендерится родитель, но пропсы не меняются', () => {
		it('Field должен отрендерится только 1 раз не смотря на то, что родитель рендерится дважды', () => {
			act(() => {
				const wrapper = mount(<Parent name="foo" />);
				wrapper.setProps({name: 'bar'});
			});
			expect(parentRenderEvent.callCount).toEqual(2);
			expect(memoizedRenderEvent.callCount).toEqual(1);
		});
	});

	describe('Проверить, что валидация работает внутри отрендерренного Field', () => {
		it('найти ошибку валидации', () => {
			act(() => {
				ReactDOM.render(<Parent name="foo" />, container);
			});

			const input = container?.querySelector('input');

			act(() => {
				input.dispatchEvent(new window.MouseEvent('blur', {bubbles: true}));
			});

			const errorSpan = input.nextElementSibling;
			expect(errorSpan.textContent).toBe('Введите корректный email');

			act(() => {
				input.value = 'test@mail.com';
				input.dispatchEvent(new window.MouseEvent('blur', {bubbles: true}));
			});

			expect(errorSpan.textContent).toBe('');
		});
	});

	describe('Проверяем рендер родителя при валидации', () => {
		it('Field РЕрендерится при валидации, родитель не перерендеривается', () => {
			act(() => {
				ReactDOM.render(<Parent name="foo" />, container);
			});

			const input = container?.querySelector('input');
			act(() => {
				input.value = 'Some text';
				input.dispatchEvent(new window.MouseEvent('blur', {bubbles: true}));
			});

			expect(parentRenderEvent.callCount).toEqual(1);
			expect(memoizedRenderEvent.callCount).toEqual(2);
		});
	});

	describe('Проверяем Multi Select Field', () => {
		it('Выбираем одно и несколько значений в мульти селекте', () => {
			act(() => {
				ReactDOM.render(<Parent name="foo" />, container);
			});

			const select = container?.querySelector('select');

			act(() => {
				select.value = 'one';
				select.dispatchEvent(new window.Event('change', {bubbles: true}));
			});

			expect(select.value).toEqual('one');

			act(() => {
				select.values = ['one', 'three'];
				select.dispatchEvent(new window.Event('change', {bubbles: true}));
			});

			expect(select.values).toEqual(['one', 'three']);
		});
	});
});
