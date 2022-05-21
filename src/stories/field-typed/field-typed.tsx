import React from 'react';

import {FieldProps, FieldType} from '~/@common/types';
import {createField} from '~/create-field';

export interface IField {
	label: string;
	step?: number;
}

const FieldView = (props: FieldProps<IField>) => {
	const {defaultValue, error, inputRef, label, name, step, type} = props;

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
				step={step}
				ref={inputRef}
			/>
			<span className="invalid-feedback d-block">{error}</span>
		</div>
	);
};

export const FieldNumber = createField<IField>(FieldType.NUMBER, FieldView);
export const FieldFloat = createField<IField>(FieldType.FLOAT, FieldView);

export const FieldBoolean = createField<IField>(FieldType.BOOLEAN, (props) => {
	const {defaultValue, errors, inputRef, label, name, type} = props;

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
				type={type}
				defaultChecked={defaultValue}
				name={name}
				ref={inputRef}
			/>
			<span>{errors[0]}</span>
		</div>
	);
});
