import React from 'react';

export const FormContext = React.createContext<{
	defaultValues: Record<string, any>;
	errors: Record<string, string[]>;
}>(undefined);
