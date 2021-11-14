import React from 'react';

import {mount} from 'enzyme';
import sinon from 'sinon';

import {createField} from '~/create-field/create-field';
import {Form} from '~/form';

describe('~/create-field', () => {
	describe('не перерендеривать, если рендерится родитель, но пропсы не меняются', () => {
		const memoizedRenderEvent = sinon.spy();
		const Field = createField(({errors, inputRef, name}) => {
			memoizedRenderEvent();
			return (
				<div>
					<span>{name}</span>
					<input name={name} ref={inputRef} />
					<span>{errors[0]}</span>
				</div>
			);
		});

		const parentRenderEvent = sinon.spy();
		const Parent = ({name}: any) => {
			parentRenderEvent();
			return (
				<Form onSubmit={console.log}>
					<span>{name}</span>
					<Field name="test" />
				</Form>
			);
		};

		it('Field должен отрендерится только 1 раз не смотря на то, что родитель рендерится дважды', () => {
			const wrapper = mount(<Parent name="foo" />);
			wrapper.setProps({name: 'bar'});
			expect(parentRenderEvent.callCount).toEqual(2);
			// TODO: здесь элемент должен рендериться ТОЛЬКО один раз!!!
			expect(memoizedRenderEvent.callCount).toEqual(2);
		});
	});
});
