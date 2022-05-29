import React from 'react';

import {createField} from '~/create-field';

export interface IField {
	label: string;
}

export const FieldSelect = createField<IField>((props) => {
	const {inputProps, label} = props;

	console.log('FieldSelect.render', {
		props,
	});
	return (
		<div className="mb-3">
			<div>{label}</div>
			<select className="form-select" {...inputProps}>
				<option value="one">Один</option>
				<option value="two">Два</option>
			</select>
		</div>
	);
});
