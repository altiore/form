import React from 'react';

import {FieldProps, createField} from '~/create-field';

export interface IField extends FieldProps {
	label: string;
	name: string;
}

export const FieldMultiSelect = createField<IField>((props) => {
	const {defaultValue, label, name} = props;

	console.log('FieldSelect.render', {
		props,
	});
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
});
