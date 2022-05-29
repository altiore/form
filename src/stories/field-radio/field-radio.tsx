import React from 'react';

import {FieldType} from '~/@common/types';
import {createField} from '~/create-field';

export interface IField {
	label: string;
}

export const FieldRadio = createField<IField>(FieldType.ENUM, (props) => {
	const {inputProps, label} = props;

	console.log('inputProps', inputProps);
	return (
		<div className="mb-3">
			<p>{label}</p>

			<div className="btn-group d-flex justify-content-evenly" role="group">
				<div>
					<input
						className="form-check-input"
						{...inputProps}
						type="radio"
						id="contactChoice1"
						defaultValue={undefined}
						defaultChecked={inputProps.defaultValue === 'email'}
						value="email"
					/>
					<label className="form-check-label ms-2" htmlFor="contactChoice1">
						Email
					</label>
				</div>

				<div>
					<div>
						<input
							className="form-check-input"
							{...inputProps}
							type="radio"
							id="contactChoice2"
							value="phone"
							defaultValue={undefined}
							defaultChecked={inputProps.defaultValue === 'phone'}
						/>
						<label className="form-check-label ms-2" htmlFor="contactChoice2">
							Phone
						</label>
					</div>
				</div>

				<div>
					<input
						className="form-check-input"
						{...inputProps}
						type="radio"
						id="contactChoice3"
						value="mail"
						defaultValue={undefined}
						defaultChecked={inputProps.defaultValue === 'mail'}
					/>
					<label className="form-check-label ms-2" htmlFor="contactChoice3">
						Mail
					</label>
				</div>
			</div>
		</div>
	);
});
