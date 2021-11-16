## Create Field

**To create a field out of the form all you need is to import createField from '@altiore/form' and then use your const Field as a tag with mandatory parameter name='YourFieldName'**

```tsx
import React from 'react';

import {createField} from '@altiore/form';

export const YourPage = () => {
	const Field = createField(
		({
			errors,
			inputRef,
			name,
			/* you can add any extra fields here: */ label,
		}) => {
			return (
				<div>
					<label htmlFor="input-id">
						{label}
						<input id="input-id" name={name} ref={inputRef} />
					</label>
					<span>{errors[0]}</span>
				</div>
			);
		},
	);
	return (
		<>
			<Field name="YourFieldName" />
		</>
	);
};
```
