import React from 'react';

import {FieldProps, createField} from '~/create-field';

export interface IField extends FieldProps {
	label: string;
}

export const Field = createField<IField>((props) => {
	const {defaultValue, errors, label, name} = props;

	console.log('Field.render', {
		props,
	});
	return (
		<div className="mb-3">
			<span className="form-label">{label}</span>
			<input className="form-control" defaultValue={defaultValue} name={name} />
			<span className="form-text">{errors[0]}</span>
		</div>
	);
});
