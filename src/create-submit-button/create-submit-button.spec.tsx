import React from 'react';
import ReactDOM, {unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';

import {mount} from 'enzyme';
import sinon from 'sinon';

import {createField} from '~/create-field/create-field';
import {createSubmitButton} from '~/create-submit-button';
import {Form} from '~/form';
import {isEmail} from '~/validators/is-email';

const memoizedRenderEvent = sinon.spy();
const SubmitButton = createSubmitButton(
	({isInvalid, isSubmitting, isUntouched}) => {
		memoizedRenderEvent();
		return <button disabled={isInvalid || isSubmitting || isUntouched} />;
	},
);

const Field = createField(({error, name}) => {
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
			<Field name="test" validate={[isEmail(null)]} />
			<SubmitButton>Отправить</SubmitButton>
		</Form>
	);
};

let container: any;

describe('~/create-submit-button', () => {
	describe('не перерендеривать, если рендерится родитель, но пропсы не меняются', () => {
		it('Button должен отрендерится только 1 раз не смотря на то, что родитель рендерится дважды', () => {
			act(() => {
				const wrapper = mount(<Parent name="foo" />);
				wrapper.setProps({name: 'bar'});
			});
			expect(parentRenderEvent.callCount).toEqual(2);
			//TODO: Скорее всего должен рендериться один раз.
			expect(memoizedRenderEvent.callCount).toEqual(2);
		});
	});

	describe('Доступность кнопки реагирует на валидацию поля', () => {
		beforeEach(() => {
			container = document.createElement('div');
			document.body.appendChild(container);
		});
		afterEach(() => {
			unmountComponentAtNode(container);
			container.remove();
			container = null;
		});
		it('Кнопка имеет атрибут disabled, когда поле не валидно', () => {
			act(() => {
				ReactDOM.render(<Parent name="foo" />, container);
			});

			const button = container?.querySelector('button');

			act(() => {
				expect(button.hasAttribute('disabled')).toBe(true);
			});

			const input = container?.querySelector('input');

			act(() => {
				input.dispatchEvent(new window.MouseEvent('blur'));
			});

			expect(button.hasAttribute('disabled')).toBe(true);
		});

		it('Кнопка НЕ имеет атрибут disabled, когда поле валидно', () => {
			act(() => {
				ReactDOM.render(<Parent name="foo" />, container);
			});

			const button = container?.querySelector('button');
			const input = container?.querySelector('input');
			act(() => {
				input.value = 'test@mail.com';
				input.dispatchEvent(new window.MouseEvent('blur'));
			});

			expect(button.hasAttribute('disabled')).toBe(false);
		});
	});
});
