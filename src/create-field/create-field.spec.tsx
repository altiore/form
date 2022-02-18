import React from 'react';
import ReactDOM from 'react-dom';
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

const parentRenderEvent = sinon.spy();
const Parent = ({name}: any) => {
	parentRenderEvent();
	return (
		<Form onSubmit={console.log}>
			<span>{name}</span>
			<Field name="test" validators={[isEmail(null)]} />
		</Form>
	);
};

let container: any;

describe('~/create-field', () => {
	describe('не перерендеривать, если рендерится родитель, но пропсы не меняются', () => {
		it('Field должен отрендерится только 1 раз не смотря на то, что родитель рендерится дважды', () => {
			act(() => {
				const wrapper = mount(<Parent name="foo" />);
				wrapper.setProps({name: 'bar'});
			});
			expect(parentRenderEvent.callCount).toEqual(2);
			expect(memoizedRenderEvent.callCount).toEqual(1);
		});
	});

	describe('проверить, что валидация работает внутри отрендерренного Field', () => {
		it('найти ошибку валидации', () => {
			container = document.createElement('div');
			document.body.appendChild(container);
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
});
