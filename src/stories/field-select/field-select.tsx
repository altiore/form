import React from 'react';

import {createField} from '~/create-field';

export interface IField {
	label: string;
}

export const FieldSelect = createField<IField>((props) => {
	const {defaultValue, label, name} = props;

	console.log('FieldSelect.render', {
		props,
	});
	return (
		<div className="mb-3">
			<div>{label}</div>
			<select className="form-select" name={name} defaultValue={defaultValue}>
				<option value="one">Один</option>
				<option value="two">Два</option>
			</select>
		</div>
	);
});
