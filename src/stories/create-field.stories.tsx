import React, {useCallback} from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';
import FieldWrong from '~/stories/field-wrong';
import SubmitButton from '~/stories/submit-button';
import {minLength} from '~/stories/validators';
import {isPhone, isRequired, isTrue} from '~/validators';

import Field from './field';
import FieldMultiSelect from './field-multi-select';
import FieldPass from './field-pass';
import FieldRadio from './field-radio';
import FieldSelect from './field-select';
import {FieldBoolean, FieldFloat, FieldNumber, FieldPhone} from './field-typed';

export default {
	argTypes: {onSubmit: {action: 'submit'}},
	component: Field,
	title: '@altiore/create-field',
} as ComponentMeta<typeof Field>;

export const SimplestFieldOutsideForm: ComponentStory<typeof Field> = () => (
	<div className="shadow border border-secondary rounded-3 p-3">
		<legend>Поле со значением по умолчанию</legend>
		<Field
			name="first"
			defaultValue="Значение по умолчанию"
			label="Минимум 3 символа"
			validate={[minLength(3)]}
		/>
		<legend>Поле с пустым значением по умолчанию</legend>
		<Field
			name="second"
			label="Тоже минимум 3"
			defaultValue=""
			validate={[minLength(3)]}
		/>
	</div>
);

type T = {
	first: string;
	second: string;
};

export const InsideFormOneField: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	return (
		<div>
			<legend>Только одно поле для проверки рендера</legend>
			<Form<T>
				defaultValues={{first: 'test'}}
				onSubmit={onSubmit}
				className="shadow border border-secondary rounded-3 p-3 w-75">
				<div className="w-75">
					<Field<T> name="first" label="Первое поле" className="mb-3" />
					<SubmitButton className="btn btn-success mb-3">
						Отправить
					</SubmitButton>
				</div>
			</Form>
		</div>
	);
};

export const InsideFormField: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	return (
		<div>
			<legend>
				Внутреннее поле формы со значением по умолчанию (Первое поле, Второе
				поле) и валидаторами (Второе поле)
			</legend>
			<Form<T>
				onSubmit={onSubmit}
				defaultValues={{first: 'ЗНАЧЕНИЕ ПО УМОЛЧАНИЮ ИЗ ФОРМЫ'}}
				className="shadow border border-secondary rounded-3 p-3 w-75">
				<Field<T>
					className="w-50"
					name="first"
					label="Первое поле"
					defaultValue={'ЗНАЧЕНИЕ ПО УМОЛЧАНИЮ'}
				/>
				<Field<T>
					className="w-50 mb-3"
					name="second"
					label="Второе поле"
					defaultValue={'тест'}
					validate={[minLength(3)]}
				/>
				<button className="btn btn-success mb-3 w-50" type="submit">
					Отправить
				</button>
			</Form>
		</div>
	);
};

type T2 = {
	email: string;
	number: number;
	boolean: boolean;
	radio: any;
	select: string;
};

export const InsideFormTypedFields: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	const handleSubmit = useCallback(
		(values: T2, setErrors) => {
			onSubmit(values);
			if (values.email === 'email@mail.com') {
				setErrors({
					email: ['Этот E-mail "email@mail.com" уже существует в базе данных'],
				});
			}
		},
		[onSubmit],
	);
	return (
		<div>
			<legend>
				Типизированные внутренние поля формы со значениями по умолчанию
			</legend>
			<Form<T2>
				onSubmit={handleSubmit}
				defaultValues={{number: 12}}
				className="shadow border border-secondary rounded-3 p-3 w-75">
				<Field<T2>
					name="email"
					label="E-mail"
					defaultValue={'email@mail.com'}
				/>

				<FieldNumber<T2> name="number" label="Число" defaultValue={4} />

				<FieldBoolean<T2>
					name="boolean"
					label="Логический оператор"
					defaultValue={true}
				/>

				<FieldRadio<T2> name="radio" label="Радио" defaultValue="email" />

				<FieldSelect<T2> name="select" label="Выбор" defaultValue="один" />

				<button className="btn btn-success" type="submit">
					Отправить
				</button>
			</Form>
		</div>
	);
};

type T3 = {
	first: string;
	variants: string;
};

const customValidate: any = (): any => {
	return undefined;
};

export const InsideFormFieldMultiSelect: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	return (
		<div>
			<legend>Выбор с помощью селекта несколько вариантов (+ crtl)</legend>
			<Form<T3>
				onSubmit={onSubmit}
				className="shadow border border-secondary rounded-3 p-3 w-75">
				<Field<T>
					name="first"
					label="Заголовок"
					defaultValue={''}
					validate={[minLength(3)]}
				/>

				<FieldMultiSelect<T3>
					name="variants"
					label="Выбор"
					validate={[customValidate]}
				/>

				<button className="btn btn-success" type="submit">
					Отправить
				</button>
			</Form>
		</div>
	);
};

type T4 = {
	sent: boolean;
};

export const InsideFormFieldCheckbox: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	return (
		<Form<T4>
			defaultValues={{sent: false}}
			onSubmit={onSubmit}
			className="shadow border border-secondary rounded-3 p-3 w-75">
			<FieldBoolean<T4>
				name="sent"
				label="Отправлено"
				defaultValue={true}
				validate={isTrue()}
			/>

			<button className="btn btn-success" type="submit">
				Отправить
			</button>
		</Form>
	);
};

type T5 = {
	amount: number;
};

export const InsideFormFloatNumber: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	return (
		<Form<T5>
			onSubmit={onSubmit}
			className="shadow border border-secondary rounded-3 p-3 w-75">
			<FieldFloat<T5>
				name="amount"
				label="Заголовок"
				step={0.5}
				validate={isRequired()}
			/>

			<button className="btn btn-success" type="submit">
				Отправить
			</button>
		</Form>
	);
};

export const InsideFormWrongField: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	return (
		<Form
			onSubmit={onSubmit}
			className="shadow border border-secondary rounded-3 p-3 w-75">
			<FieldWrong<T5>
				name="amount"
				label="Загляни в консоль - там должна быть ошибка"
				items={['test']}
				type="number"
			/>

			<button className="btn btn-success" type="submit">
				Отправить
			</button>
		</Form>
	);
};

export const PhoneNumber: ComponentStory<typeof Field> = ({onSubmit}: any) => {
	return (
		<Form
			onSubmit={onSubmit}
			className="shadow border border-secondary rounded-3 p-3 w-75">
			<FieldPhone name="phone" label="Телефон" validate={isPhone()} />

			<button className="btn btn-success" type="submit">
				Отправить
			</button>
		</Form>
	);
};

export const PassSecurityWarning: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	return (
		<Form
			onSubmit={onSubmit}
			className="shadow border border-secondary rounded-3 p-3 w-75">
			<FieldPass name="password" label="Пароль" />

			<button className="btn btn-success" type="submit">
				Отправить
			</button>
		</Form>
	);
};
