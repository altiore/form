import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import Field from '~/create-field/field';
import {Form} from '~/form';

import ArrayField, {ArrayFieldSimplest} from './array-field';

export default {
	argTypes: {onSubmit: {action: 'submit'}},
	component: ArrayField,
	title: '@altiore/create-array-field',
} as ComponentMeta<typeof ArrayField>;

export const SimplestArrayField: ComponentStory<typeof ArrayField> = () => (
	<ArrayField name="ingredients" />
);

export const InsideFormArrayFieldSimplest: ComponentStory<typeof ArrayField> =
	({onSubmit}: any) => (
		<div>
			<Form onSubmit={onSubmit}>
				<Field label="Title" name="title" />
				<ArrayFieldSimplest name="ingredients" />
				<button type="submit">submit</button>
			</Form>
		</div>
	);

export const InsideFormArrayField: ComponentStory<typeof ArrayField> = ({
	onSubmit,
}: any) => (
	<Form onSubmit={onSubmit}>
		<Field label="Title" name="title" />
		<ArrayField name="ingredients" />
		<button type="submit">Submit</button>
	</Form>
);
