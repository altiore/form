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
		<div>
			<span>{label}</span>
			<input defaultValue={defaultValue} name={name} />
			<span>{errors[0]}</span>
		</div>
	);
});
