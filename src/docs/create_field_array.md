## Create FieldArray

**To create a FieldArray out of the form all you need is to import createField and createFieldArray from '@altiore/form' and then use your const FieldArray as a tag with mandatory parameter name='YourFieldName'**

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
