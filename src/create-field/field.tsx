import React from 'react';

import {FieldProps, createField} from './create-field';

export interface IField extends FieldProps {
	label: string;
}

export const Field = createField<IField>(({inputRef, errors, label, name}) => {
	console.log('Field.render', {
		name,
	});
	return (
		<div>
			<span>{label}</span>
			<span>{name}</span>
			<input name={name} ref={inputRef} />
			<span>{errors[0]}</span>
		</div>
	);
});
