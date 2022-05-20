import React from 'react';
import {act} from 'react-dom/test-utils';

import {mount} from 'enzyme';
import sinon from 'sinon';

import {createFieldArray} from '~/create-field-array/create-field-array';
import Field from '~/stories/field';

const memoizedRenderEvent = sinon.spy();
const FieldArray = createFieldArray(({list}) => {
	memoizedRenderEvent();
	return (
		<>
			{list.map(({key}) => {
				return <Field validate={[]} key={key} label="Title" name="title" />;
			})}
		</>
	);
});

const parentRenderEvent = sinon.spy();
const Parent = ({name}: any) => {
	parentRenderEvent();
	return (
		<div>
			<span>{name}</span>
			<FieldArray name="ingredients" />
		</div>
	);
};

describe('~/create-field-array', () => {
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
});
