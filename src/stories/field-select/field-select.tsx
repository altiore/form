import React from 'react';

import {FieldProps, createField} from '~/create-field';

export interface IField extends FieldProps {
	label: string;
}

export const FieldSelect = createField<IField>((props) => {
	const {defaultValue, label, name} = props;

	console.log('FieldSelect.render', {
		props,
	});
	return (
		<div>
			<div>{label}</div>
			<select className="form-select" name={name} defaultValue={defaultValue}>
				<option value="one">One</option>
				<option value="two">Two</option>
			</select>
		</div>
	);
});
