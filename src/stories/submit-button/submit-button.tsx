import React from 'react';

import {
	InternalSubmitButtonProps,
	createSubmitButton,
} from '~/create-submit-button';

const SubmitButtonView: React.FC<InternalSubmitButtonProps> = ({
	isInvalid,
	isSubmitting,
	...props
}) => {
	return <button {...props} disabled={isInvalid || isSubmitting} />;
};

export const SubmitButton = createSubmitButton(SubmitButtonView);
