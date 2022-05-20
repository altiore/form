import React from 'react';

import {FieldProps, createField} from '~/create-field';

export interface IField extends FieldProps {
	className?: string;
	label: string;
}

export const Field = createField<IField>({hideErrorInXSec: false}, (props) => {
	const {className, defaultValue, error, label, name} = props;

	console.log('Field.render', {
		props,
	});
	return (
		<div className={'mb-3 ' + className ? className : ''}>
			<label className="form-label">{label}</label>
			<input
				className={'form-control' + (error ? ' is-invalid' : '')}
				defaultValue={defaultValue}
				name={name}
			/>
			<span className="invalid-feedback d-block">{error}</span>
		</div>
	);
});
