## Create FieldArray

**русская версия** [**create-field-array.ru.md**](create-field-array.ru.md)

```tsx
import React from 'react';
import Field from './create-field.ru';
import {FieldArrayProps, createFieldArray} from '@altiore/form';

export const YourFieldArray = () => {
	const FieldArray = createFieldArray<FieldArrayProps>(({list}) => {
		return (
			<div>
				{list.map(({key, remove, append, prepend}) => {
					return (
						<div key={key}>
							<div>
								<Field label={''} name="ingredient" />
								<button onClick={remove} type="button">
									-
								</button>
								<button onClick={append} type="button">
									after
								</button>
								<button onClick={prepend} type="button">
									before
								</button>
							</div>
						</div>
					);
				})}
				<button onClick={list.add} type="button">
					Добавить
				</button>
			</div>
		);
	});
	return (
		<>
			<FieldArray name="FieldArrayName" />
		</>
	);
};
```
