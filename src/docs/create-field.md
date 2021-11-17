## Create Field

```tsx
import React from 'react';
import {createField} from '@altiore/form';
export const Field = createField(
	({error, name, /* you can add any extra fields here: */ label}) => {
		return (
			<div>
				<label htmlFor="input-id">
					{label}
					<input id="input-id" name={name} />
				</label>
				<span>{error}</span>
			</div>
		);
	},
);
```

**How to use**

```tsx
import Field from '@altiore/form';

() => <Field name="title" />;
```
