##Create Validator

```tsx
import React from 'react';
import {Field, Form} from '@altiore/form';

import {ValidateFuncType} from '~/@common/types';

const minLength =
  (length: number): ValidateFuncType =>
  (value: string | any[] = '') => {
    if (typeof value?.length !== 'number') {
      throw new Error(
        `Not supported type "${typeof value}" provided to validate function "minLength"`,
      );
    }
    if (length < 0) {
      throw new Error(`Param 'length' cannot be less than 0`);
    }
    if (value.length < length) {
      return {
        error: new Error(`Минимальная длина введенного значения - ${length}`),
        value,
      };
    }
    return undefined;
  };

const SimplestFieldWithValidator = () => (
  <form>
    <Field
      name="second"
      label="Second"
      defaultValue=""
      validators={[minLength(3)]}
    />
  </form>
);
```
