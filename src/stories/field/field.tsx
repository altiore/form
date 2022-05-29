import React from 'react';

import {createField} from '~/create-field';

export interface IField {
	className?: string;
	label: string;
}

export const Field = createField<IField>((props) => {
	const {
		className,
		inputProps,
		label,
		fieldProps: {error},
	} = props;

	console.log('Field.render', {
		props,
	});
	return (
		<div className={'mb-3 ' + className ? className : ''}>
			<label className="form-label">{label}</label>
			<input
				className={'form-control' + (error ? ' is-invalid' : '')}
				{...inputProps}
			/>
			<span className="invalid-feedback d-block">{error}</span>
		</div>
	);
});
