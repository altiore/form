import React, {useCallback} from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';
import {minLength} from '~/validators/min-length';

import Field from './field';
import FieldMultiSelect from './field-multi-select';
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
		<legend>Поле со значением по умолчанию</legend>
		<div className="w-75 ">
			<Field
				name="first"
				defaultValue="Значение по умолчанию"
				label="Первое поле"
				validators={[minLength(null, 3)]}
			/>
		</div>
		<legend>Поле с пустым значением по умолчанию</legend>
		<div className="w-75">
			<Field
				name="second"
				label="Второе поле"
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

export const InsideFormOneField: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	return (
		<>
			<legend>Только одно поле для проверки рендера</legend>
			<div className="shadow border border-secondary rounded-3 p-3 w-75">
				<Form<T> onSubmit={onSubmit}>
					<div className=" w-75">
						<Field<T> name="first" label="Первое поле" />
						<button className="btn btn-success" type="submit">
							Отправить
						</button>
					</div>
				</Form>
			</div>
		</>
	);
};

export const InsideFormField: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	return (
		<>
			<legend>
				Внутреннее поле формы со значением по умолчанию (Первое поле, Второе
				поле) и валидаторами (Второе поле)
			</legend>
			<div className="shadow border border-secondary rounded-3 p-3 w-75">
				<Form<T>
					onSubmit={onSubmit}
					defaultValues={{first: 'ЗНАЧЕНИЕ ПО УМОЛЧАНИЮ ИЗ ФОРМЫ'}}>
					<div className=" w-75">
						<Field<T>
							name="first"
							label="Первое поле"
							defaultValue={'ЗНАЧЕНИЕ ПО УМОЛЧАНИЮ'}
						/>
						<button className="btn btn-success" type="submit">
							Отправить
						</button>
					</div>
					<div className=" w-75">
						<Field<T>
							name="second"
							label="Второе поле"
							defaultValue={'тест'}
							validators={[minLength(null, 3)]}
						/>
						<button className="btn btn-success" type="submit">
							Отправить
						</button>
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

export const InsideFormTypedField: ComponentStory<typeof Field> = ({
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
		<>
			<legend>
				Типизированные внутренние поля формы со значениями по умолчанию
			</legend>
			<div className="shadow border border-secondary rounded-3 p-3 w-75">
				<Form<T2> onSubmit={handleSubmit} defaultValues={{number: 12}}>
					<div>
						<Field<T2> name="string" label="Строка" defaultValue={'строка'} />
					</div>

					<div className="mb-3">
						<FieldNumber<T2> name="number" label="Число" defaultValue={4} />
					</div>

					<div>
						<FieldBoolean<T2>
							name="boolean"
							label="Логический оператор"
							defaultValue={true}
						/>
					</div>

					<div className="w-75 mb-3">
						<FieldRadio<T2> name="radio" label="Радио" defaultValue="email" />
					</div>

					<div className="mb-3">
						<FieldSelect<T2> name="select" label="Выбор" defaultValue="один" />
					</div>

					<button className="btn btn-success" type="submit">
						Отправить
					</button>
				</Form>
			</div>
		</>
	);
};

type T3 = {
	first: string;
	variants: string;
};

const validate: any = (): any => {
	return undefined;
};

export const InsideFormFieldMultiSelect: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	return (
		<>
			<legend>Выбор с помощью селекта несколько вариантов (+ crtl)</legend>
			<div className="shadow border border-secondary rounded-3 p-3 w-75">
				<Form<T3> onSubmit={onSubmit}>
					<div className=" w-75">
						<Field<T>
							name="first"
							label="Заголовок"
							defaultValue={''}
							validators={[minLength(null, 3)]}
						/>
					</div>
					<div className=" w-75">
						<FieldMultiSelect<T3>
							name="variants"
							label="Выбор"
							validators={[validate]}
						/>
					</div>
					<button className="btn btn-success" type="submit">
						Отправить
					</button>
				</Form>
			</div>
		</>
	);
};
