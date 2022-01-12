import React, {useCallback} from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';
import {minLength} from '~/validators/min-length';

import Field from './field';
import FieldRadio from './field-radio';
import FieldSelect from './field-select';
import {FieldBoolean, FieldNumber} from './field-typed';

export default {
	argTypes: {onSubmit: {action: 'submit'}},
	component: Field,
	title: '@altiore/create-field',
} as ComponentMeta<typeof Field>;

export const SimplestField: ComponentStory<typeof Field> = () => (
	<>
		<legend>Field with default value</legend>
		<div className="w-75 ">
			<Field
				name="first"
				defaultValue="Default"
				label="First"
				validators={[minLength(null, 3)]}
			/>
		</div>
		<legend>Field with empty default value</legend>
		<div className="w-75">
			<Field
				name="second"
				label="Second"
				defaultValue=""
				validators={[minLength(null, 3)]}
			/>
		</div>
	</>
);

type T = {
	first: string;
	second: string;
};

export const InsideFormField: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	return (
		<>
			<legend>
				Inside form fields with default values (first,second) and validators
				(second)
			</legend>
			<div className="shadow border border-secondary rounded-3 w-75">
				<Form<T> onSubmit={onSubmit} defaultValues={{first: 'NOT DEFAULT'}}>
					<div className="p-3 ">
						<Field<T> name="first" label="First" defaultValue={'DEFAULT'} />
						<Field<T>
							name="second"
							label="Second"
							defaultValue={'test'}
							validators={[minLength(null, 3)]}
						/>
					</div>
				</Form>
			</div>
		</>
	);
};

type T2 = {
	string: string;
	number: number;
	boolean: boolean;
	radio: any;
	select: string;
};

export const InsideFormTypedField: ComponentStory<typeof FieldNumber> = ({
	onSubmit,
}: any) => {
	const handleSubmit = useCallback(
		(values, setErrors) => {
			onSubmit(values);
			setErrors({string: ['test error']});
		},
		[onSubmit],
	);
	return (
		<Form<T2> onSubmit={handleSubmit} defaultValues={{number: 12}}>
			<Field<T2> name="string" label="String" defaultValue={'string'} />
			<FieldNumber<T2> name="number" label="Number" defaultValue={4} />
			<FieldBoolean<T2> name="boolean" label="Boolean" defaultValue={true} />
			<FieldRadio<T2> label="Radio" name="radio" defaultValue="email" />
			<FieldSelect<T2> label="Select" name="select" defaultValue="one" />
			<button className="btn btn-success" type="submit">
				Отправить
			</button>
		</Form>
	);
};
