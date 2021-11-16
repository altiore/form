## Создание FieldArray

**Чтобы создать простой FieldArray вне формы, необходимо импортировать createField createFieldArray из '@altiore/form', а затем использовать FieldArray с обязательным параметром name = 'YourFieldName'**

```tsx
import React from 'react';

import {
	createField,
	createFieldArray,
	FieldArrayProps,
	minLength,
} from '@altiore/form';

export const YourFieldArray = () => {
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

	const FieldArray = createFieldArray<FieldArrayProps>(({list}) => {
		return (
			<div>
				{list.map(({key, remove, append, prepend}) => {
					return (
						<div key={key}>
							<div style={{display: 'flex'}}>
								<Field
									label={''}
									name="ingredient"
									validators={[minLength(3)]}
								/>
								{/*<ArrayTags name="tags" />*/}
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
