import React from 'react';

import {SubmitProps, createSubmitButton} from '~/create-submit-button';

interface Props extends SubmitProps {
	skipUntouched?: boolean;
}

export const SubmitButton = createSubmitButton<Props>(
	({isInvalid, isSubmitting, isUntouched, skipUntouched, ...props}) => {
		return (
			<button
				{...props}
				disabled={isInvalid || isSubmitting || (!skipUntouched && isUntouched)}
			/>
		);
	},
);
