import React from 'react';

import {FieldType} from '~/@common/types';
import {createField} from '~/create-field';

export interface IField {
	label: string;
}

export const FieldMultiSelect = createField<IField>(
	FieldType.SELECT_MULTIPLE,
	(props) => {
		const {defaultValue, label, name} = props;

		return (
			<div>
				<div>{label}</div>
				<select
					multiple
					className="form-select w-75"
					name={name}
					defaultValue={defaultValue}>
					<option value="one">Один</option>
					<option value="two">Два</option>
					<option value="three">Три</option>
					<option value="four">Четыре</option>
					<option value="five">Пять</option>
				</select>
			</div>
		);
	},
);
