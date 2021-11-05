import React from 'react';

import {FieldProps, createField} from '~/create-field';
import {equalFieldByRef} from '~/validators/equal-field/equal-field';

export interface IField extends FieldProps {
	label: string;
}

export const Field = createField<IField>((props) => {
	const {defaultValue, errors, inputRef, label, name} = props;

	return (
		<div>
			<span>{label}</span>
			<span>{name}</span>
			<input defaultValue={defaultValue} name={name} ref={inputRef} />
			<span>{errors[0]}</span>
		</div>
	);
});
export const Field3 = createField<IField>((props) => {
	const {defaultValue, errors, inputRef, label, name} = props;

	return (
		<div>
			<span>{label}</span>
			<span>{name}</span>
			<input defaultValue={defaultValue} name={name} ref={inputRef} />
			<span>{errors[0]}</span>
			<Field2
				label={''}
				name={'description'}
				validators={[equalFieldByRef(inputRef)]}
			/>
		</div>
	);
});

export const Field2 = createField<IField>((props) => {
	const {defaultValue, errors, inputRef, label, name} = props;

	return (
		<>
			<span>{label}</span>
			<span>{name}</span>
			<input defaultValue={defaultValue} name={name} ref={inputRef} />
			<span>{errors[0]}</span>
		</>
	);
});
