import React from 'react';

import {createField} from '~/create-field';

export interface IField {
	className?: string;
	label: string;
	inputProps: string[];
	type: string;
}

export const FieldWrong = createField<IField>((props) => {
	const {
		className,
		inputProps,
		label,
		fieldProps: {error},
		...otherProps
	} = props;

	console.log('Field.render', {
		otherProps,
		props,
	});
	return (
		<div className={'mb-3 ' + className ? className : ''}>
			<label className="form-label">{label}</label>
			<input
				className={'form-control' + (error ? ' is-invalid' : '')}
				{...inputProps}
				{...otherProps}
			/>
			<span className="invalid-feedback d-block">{error}</span>
		</div>
	);
});
