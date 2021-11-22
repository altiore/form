## Создание FieldArray

**English version** [**create-field-array.md**](create-field-array.md)

```tsx
import React from 'react';
import {createFieldArray} from '@altiore/form';

const FieldArray = createFieldArray(({list}) => {
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
```

**How to use**
Использование FieldArray дает множество преимуществ. Он позволяет дабавить набор полей. Или выберите простое поле [Field](create-field.ru.md) для своей формы [Form](README.RU.md)

```tsx
const MyForm = () => {
  return (
    <Form>
      <FieldArray name="FieldArrayName" />
    </Form>
  );
};
```
