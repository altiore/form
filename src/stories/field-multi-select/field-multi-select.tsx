import React from 'react';

import {FieldType} from '~/@common/types';
import {createField} from '~/create-field';

export interface IField {
	label: string;
}

export const FieldMultiSelect = createField<IField>(
	FieldType.SELECT_MULTIPLE,
	(props) => {
		const {inputProps, label} = props;

		return (
			<div>
				<div>{label}</div>
				<select multiple className="form-select w-75" {...inputProps}>
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
