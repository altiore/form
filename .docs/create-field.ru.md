## Создание поля ввода:

**английская версия** [**create-field.md**](create-field.md)

```tsx
import React from 'react';
import {createField, Form} from '@altiore/form';

export const Field = createField(
  ({
    fieldProps,
    inputProps,
    label /* вы можете добавить сюда любые дополнительные поля: */,
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

**Как использовать**
Используйте в Вашей [форме](README.RU.md) Field правильно с обязательным атрибутом name = ''. Используйте [FieldArray](create-field-array.ru.md) для массивов.

```tsx
const MyForm = () => {
  return (
    <Form>
      <Field name="title" />
    </Form>
  );
};
```
