## Create Field

**Создание поля ввода:**

```tsx
import React from 'react';
import {createField} from '@altiore/form';
export const Field = createField(
	({
		error,
		name,
		/* вы можете добавить сюда любые дополнительные поля: */ label,
	}) => {
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

**Как использовать**

```tsx
import Field from '@altiore/form';

() => <Field name="title" />;
```
