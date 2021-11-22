## Create FieldArray

**русская версия** [**create-field-array.ru.md**](create-field-array.ru.md)

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
You can choose FieldArray for other features. It lets you create a set of fields or remove fields. In other cases use simple [Field](create-field.md) in your [Form](README.md).

```tsx
const MyForm = () => {
  return (
    <Form>
      <FieldArray name="FieldArrayName" />
    </Form>
  );
};
```
