import React from 'react';

import {FieldType} from '~/@common/types';
import {FieldProps, createField} from '~/create-field';

export interface IField extends FieldProps {
	label: string;
}

export const FieldRadio = createField<IField>(FieldType.ENUM, (props) => {
	const {defaultValue, label, name} = props;

	return (
		<div>
			<p>{label}</p>
			<div>
				<input
					className="form-check-input"
					type="radio"
					id="contactChoice1"
					name={name}
					value="email"
					defaultChecked={defaultValue === 'email'}
				/>
				<label className="form-check-label" htmlFor="contactChoice1">
					Email
				</label>

				<input
					className="form-check-input"
					type="radio"
					id="contactChoice2"
					name={name}
					value="phone"
					defaultChecked={defaultValue === 'phone'}
				/>
				<label className="form-check-label" htmlFor="contactChoice2">
					Phone
				</label>

				<input
					className="form-check-input"
					type="radio"
					id="contactChoice3"
					name={name}
					value="mail"
					defaultChecked={defaultValue === 'mail'}
				/>
				<label className="form-check-label" htmlFor="contactChoice3">
					Mail
				</label>
			</div>
		</div>
	);
});
