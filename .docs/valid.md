##Create Validator

```tsx
import React from 'react';

import {Form, createField} from '@altiore/form';

const Field = createField(({fieldProps, inputProps}) => {
  return (
    <div>
      <input {...inputProps} />
      <span>Ошибка валидации: {fieldProps.error}</span>
    </div>
  );
});

const customFieldLevelValidation = (value) => {
  if (value && value.length < 3) {
    return 'Значение не может быть меньше 3';
  }
  return undefined;
};

const SimplestFieldWithValidator = () => (
  <Form>
    <Field
      name="second"
      label="Second"
      defaultValue=""
      validate={customFieldLevelValidation}
    />
  </Form>
);
```
