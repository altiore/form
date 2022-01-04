# Altiore Form

`@altiore/form`

Productive, flexible and extensible forms with easy-to-use validation and the most user-friendly API [**@altiore/form**](https://www.npmjs.com/package/@altiore/form)

<a href="https://www.npmjs.com/package/@altiore/form" target="_blank">
  <img src="https://img.shields.io/npm/v/@altiore/form.svg" alt="NPM Version" />
</a>

**русская версия**
[**README.RU.md**](README.RU.md)

## Why?

To simplify and speed up work with forms. If you are tired of the terribly slow forms of React and tired to write the same things again and again

## Installation:

#### npm

```bash
npm i @altiore/form -S
```

#### yarn

```bash
yarn add @altiore/form
```

## Simplest usage

```tsx
import React, {useCallback} from 'react';

import {Form} from '@altiore/form';

const MyForm = () => {
  const handleSubmit = useCallback((values) => {
    console.log('form.values is', values);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <input name="name" />
      <button type="submit">Submit</button>
    </Form>
  );
};
```

## Custom field

**Allows you to customize the appearance of the input adds validation functionality and several other useful features. [Custom Field in details](.docs/create-field.md)**
**You could use [FieldArray](.docs/create-field-array.md) for arrays**

```tsx
import React, {useCallback} from 'react';

import {createField, Form} from '@altiore/form';

/**
 * error and name here added by createField halper
 */
const FieldView = ({error, name, label}) => {
  return (
    <div>
      <label htmlFor="input-id">
        {label}
        <input id="input-id" name={name} />
      </label>
      <span>{error}</span>
    </div>
  );
};

export const Field = createField(FieldView);

const MyForm = () => {
  const handleSubmit = useCallback((values) => {
    console.log('form.values is', values);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Field Label"
        name="name"
        validators={
          [
            /* you can add validators here */
          ]
        }
      />
      <button type="submit">Submit</button>
    </Form>
  );
};
```

## Validation

[Validation detailed example](.docs/valid.md)
