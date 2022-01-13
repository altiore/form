import React from 'react';

import {
	InternalSubmitButtonProps,
	createSubmitButton,
} from '~/create-submit-button';

const SubmitButtonView: React.FC<InternalSubmitButtonProps> = ({
	isInvalid,
	isSubmitting,
	isUntouched,
	...props
}) => {
	return (
		<button {...props} disabled={isInvalid || isSubmitting || isUntouched} />
	);
};

export const SubmitButton = createSubmitButton(SubmitButtonView);
