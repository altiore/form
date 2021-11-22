## Создание поля ввода:

**английская версия** [**create-field.md**](create-field.md)

```tsx
import React from 'react';
import {createField, Form} from '@altiore/form';

export const Field = createField(
  ({
        error,
        name,
        label /* вы можете добавить сюда любые дополнительные поля: */,
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
const MyForm = () => {
  return (
    <Form>
      <Field name="title" />
    </Form>
  );
};
```
