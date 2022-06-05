import React from 'react';

import {FieldType} from '~/@common/types';
import {createField} from '~/create-field';

export interface IField {
	className?: string;
	label: string;
}

export const FieldPass = createField<IField>(FieldType.PASSWORD, (props) => {
	const {
		className,
		inputProps,
		label,
		fieldProps: {error, warnings, warning},
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
			<span>Уровень защиты {5 - warnings.length}</span>
			<span className="invalid-feedback d-block">{warning}</span>
			<span className="invalid-feedback d-block">{error}</span>
		</div>
	);
});
