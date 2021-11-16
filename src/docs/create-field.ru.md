## Create Field

**Чтобы создать простое поле вне формы, необходимо импортировать createField из '@altiore/form', а затем использовать Field с обязательным параметром name = 'YourFieldName'**

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
