## Create Field

**русская версия** [**create-field.ru.md**](create-field.ru.md)

```tsx
import React from 'react';
import {createField, Form} from '@altiore/form';

export const Field = createField(
	({error, name, label /* you can add any extra fields here: */}) => {
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
const MyForm;
() => {
	return (
		<Form>
			<Field name="title" />
		</Form>
	);
};
```