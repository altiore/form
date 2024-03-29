## Create Field

**русская версия** [**create-field.ru.md**](create-field.ru.md)

```tsx
import React from 'react';
import {createField, Form} from '@altiore/form';

export const Field = createField(
  ({
    fieldProps,
    inputProps,
    label /* you can add any extra fields here: */,
  }) => {
    return (
      <div>
        <label htmlFor="input-id">
          {label}
          <input id="input-id" {...inputProps} />
        </label>
        <span>{fieldProps.error}</span>
      </div>
    );
  },
);
```

**How to use**
Use Field properly in your [Form](README.md) with mandatory attribute name =''. Choose [FieldArray](create-field-array.md) for arrays.

```tsx
const MyForm = () => {
  return (
    <Form>
      <Field name="title" />
    </Form>
  );
};
```
