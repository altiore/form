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

**Как использовать:**
Использование FieldArray позволяют добавлять/удалять элементы массивов, которые вы хотели бы видеть в ваших формах. Внутри элемента массива, вы можете использовать обычное поле [Field](create-field.ru.md) при необходимости. Не забудьте, что все это должно находиться в нутри [Form](README.RU.md)

```tsx
const MyForm = () => {
  return (
    <Form>
      <FieldArray name="FieldArrayName" />
    </Form>
  );
};
```
