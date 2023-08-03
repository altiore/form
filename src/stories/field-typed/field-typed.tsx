import React from 'react';

import {FieldProps, FieldType} from '~/@common/types';
import {createField} from '~/create-field';

export interface IField {
	label: string;
	step?: number;
	disabled?: boolean;
}

const FieldView = (props: FieldProps<IField>) => {
	const {
		disabled,
		inputProps,
		label,
		step,
		fieldProps: {error},
	} = props;

	console.log('FieldNumber.render', {
		props,
	});
	return (
		<div className="mb-3">
			<label className="form-label">{label}</label>
			<input
				className="form-control"
				{...inputProps}
				step={step}
				disabled={disabled}
			/>
			<span className="invalid-feedback d-block">{error}</span>
		</div>
	);
};

export const FieldNumber = createField<IField>(FieldType.NUMBER, FieldView);
export const FieldFloat = createField<IField>(FieldType.FLOAT, FieldView);
export const FieldPhone = createField<IField>(FieldType.PHONE, FieldView);

export const FieldBoolean = createField<IField>(FieldType.BOOLEAN, (props) => {
	const {
		fieldProps: {error},
		inputProps,
		label,
	} = props;

	console.log('FieldBoolean.render', {
		props,
	});
	return (
		<div className="mb-3 d-flex-column">
			<div>
				<label className="form-label d-inline-flex">{label}</label>
			</div>
			<span>{inputProps.name}</span>
			<input className="form-check-input ms-2" {...inputProps} />
			<span>{error}</span>
		</div>
	);
});
