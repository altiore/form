import React from 'react';

import {FieldProps, createField} from '~/create-field';

export interface IFieldNumber extends FieldProps {
	label: string;
}

export const FieldNumber = createField<IFieldNumber>((props) => {
	const {defaultValue, errors, inputRef, label, name} = props;

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
