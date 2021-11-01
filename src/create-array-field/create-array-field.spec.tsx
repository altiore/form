import React from 'react';

import {mount} from 'enzyme';
import sinon from 'sinon';

import {createArrayField} from '~/create-array-field/create-array-field';
import Field from '~/create-field/field';

describe('~/create-array-field', () => {
	describe('не перерендеривать, если рендерится родитель, но пропсы не меняются', () => {
		const memoizedRenderEvent = sinon.spy();
		const ArrayField = createArrayField(({list}) => {
			memoizedRenderEvent();
			return (
				<>
					{list.map(({key}) => {
						return <Field key={key} label="Title" name="title" />;
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
					<ArrayField name="ingredients" />
				</div>
			);
		};

		it('Field должен отрендерится только 1 раз не смотря на то, что родитель рендерится дважды', () => {
			const wrapper = mount(<Parent name="foo" />);
			wrapper.setProps({name: 'bar'});
			expect(parentRenderEvent.callCount).toEqual(2);
			expect(memoizedRenderEvent.callCount).toEqual(1);
		});
	});
});
