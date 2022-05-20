import React from 'react';

import {FieldType} from '~/@common/types';
import {FieldProps, createField} from '~/create-field';

export interface IField extends FieldProps {
	label: string;
}

export const FieldNumber = createField<IField>(FieldType.NUMBER, (props) => {
	const {defaultValue, error, inputRef, label, name, type} = props;

	console.log('FieldNumber.render', {
		props,
	});
	return (
		<div className="mb-3">
			<label className="form-label">{label}</label>
			<input
				className="form-control"
				type={type}
				defaultValue={defaultValue}
				name={name}
				ref={inputRef}
			/>
			<span>{error}</span>
		</div>
	);
});

export const FieldBoolean = createField<IField>(FieldType.BOOLEAN, (props) => {
	const {defaultValue, errors, inputRef, label, name} = props;

	console.log('FieldBoolean.render', {
		props,
	});
	return (
		<div className="mb-3 d-flex-column">
			<div>
				<label className="form-label d-inline-flex">{label}</label>
			</div>
			<span>{name}</span>
			<input
				className="form-check-input ms-2"
				type="checkbox"
				defaultChecked={defaultValue}
				name={name}
				ref={inputRef}
			/>
			<span>{errors[0]}</span>
		</div>
	);
});
