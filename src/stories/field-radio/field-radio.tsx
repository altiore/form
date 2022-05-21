import React from 'react';

import {FieldType} from '~/@common/types';
import {createField} from '~/create-field';

export interface IField {
	label: string;
}

export const FieldRadio = createField<IField>(FieldType.ENUM, (props) => {
	const {defaultValue, label, name} = props;

	return (
		<div className="mb-3">
			<p>{label}</p>

			<div className="btn-group d-flex justify-content-evenly" role="group">
				<div>
					<input
						className="form-check-input"
						type="radio"
						id="contactChoice1"
						name={name}
						value="email"
						defaultChecked={defaultValue === 'email'}
					/>
					<label className="form-check-label ms-2" htmlFor="contactChoice1">
						Email
					</label>
				</div>

				<div>
					<div>
						<input
							className="form-check-input"
							type="radio"
							id="contactChoice2"
							name={name}
							value="phone"
							defaultChecked={defaultValue === 'phone'}
						/>
						<label className="form-check-label ms-2" htmlFor="contactChoice2">
							Phone
						</label>
					</div>
				</div>

				<div>
					<input
						className="form-check-input"
						type="radio"
						id="contactChoice3"
						name={name}
						value="mail"
						defaultChecked={defaultValue === 'mail'}
					/>
					<label className="form-check-label ms-2" htmlFor="contactChoice3">
						Mail
					</label>
				</div>
			</div>
		</div>
	);
});
