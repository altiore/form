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
			<span>{label}</span>
			<span>{name}</span>
			<input
				type="number"
				defaultValue={defaultValue}
				name={name}
				ref={inputRef}
			/>
			<span>{errors[0]}</span>
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
			<span>{label}</span>
			<span>{name}</span>
			<input
				type="checkbox"
				defaultChecked={defaultValue}
				name={name}
				ref={inputRef}
			/>
			<span>{errors[0]}</span>
		</div>
	);
});
