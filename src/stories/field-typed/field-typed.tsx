import React from 'react';

import {FieldType} from '~/@common/types';
import {FieldProps, createField} from '~/create-field';

export interface IField extends FieldProps {
	label: string;
}

export const FieldNumber = createField<IField>(FieldType.NUMBER, (props) => {
	const {defaultValue, errors, inputRef, label, name} = props;

	console.log('FieldNumber.render', {
		props,
	});
	return (
		<div>
			<span className="input-group-text">{label}</span>
			<span className="input-group-text">{name}</span>
			<input
				className="form-control"
				type="number"
				defaultValue={defaultValue}
				name={name}
				ref={inputRef}
			/>
			<span className="input-group-text">{errors[0]}</span>
		</div>
	);
});

export const FieldBoolean = createField<IField>(FieldType.BOOLEAN, (props) => {
	const {defaultValue, errors, inputRef, label, name} = props;

	console.log('FieldBoolean.render', {
		props,
	});
	return (
		<div>
			<span className="input-group-text">{label}</span>
			<span className="input-group-text">{name}</span>
			<input
				className="form-check-input"
				type="checkbox"
				defaultChecked={defaultValue}
				name={name}
				ref={inputRef}
			/>
			<span className="input-group-text">{errors[0]}</span>
		</div>
	);
});
