import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Form} from '~/form';
import Field from '~/stories/field';
import {minLength} from '~/validators';
import {comparePassword} from '~/validators';

export default {
	argTypes: {onSubmit: {action: 'submit'}},
	component: Field,
	title: '@altiore/validators',
} as ComponentMeta<typeof Field>;

type T = {
	password: string;
	repeatPassword: string;
};

const PASSWORD_NAME = 'password';

export const ComparePasswordField: ComponentStory<typeof Field> = ({
	onSubmit,
}: any) => {
	return (
		<>
			<legend>Сравнение пароля</legend>
			<div className="shadow border border-secondary rounded-3 p-3 w-75">
				<Form<T> onSubmit={onSubmit}>
					<div className=" w-75">
						<Field<T>
							name={PASSWORD_NAME}
							label="Пароль"
							defaultValue=""
							validators={[minLength(null, 3)]}
						/>
					</div>
					<div className=" w-75">
						<Field<T>
							name="repeatPassword"
							label="Повторить пароль"
							defaultValue=""
							validators={[
								minLength(null, 3),
								comparePassword(null, PASSWORD_NAME),
							]}
						/>
					</div>
				</Form>
			</div>
		</>
	);
};
