import React from 'react';

import {SubmitProps} from '~/@common/types';
import {createSubmit} from '~/create-submit';

export interface ISubmit {
	children: string;
	className?: string;
	skipUntouched?: boolean;
}

export const SubmitButton = createSubmit<ISubmit>(
	({
		isInvalid,
		isSubmitting,
		isUntouched,
		skipUntouched,
		...props
	}: SubmitProps<ISubmit>) => {
		return (
			<button
				{...props}
				disabled={isInvalid || isSubmitting || (!skipUntouched && isUntouched)}
			/>
		);
	},
);
