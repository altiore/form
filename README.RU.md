# Altiore Form

`@altiore/form`

мощные формы от [**@altiore/form**](https://www.npmjs.com/package/@altiore/form)

<a href="https://www.npmjs.com/package/@altiore/form" target="_blank">
  <img src="https://img.shields.io/npm/v/@altiore/form.svg" alt="NPM Version" />
</a>

**английская версия**
[**README.md**](README.md)

## Зачем?

Чтобы облегчить работу с формами

## Установка:

#### npm

```bash
npm i @altiore/form -S
```

#### yarn

```bash
yarn add @altiore/form
```

## Простейшее использование

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

## Пользовательская форма

**Пользовательский вариант дает возможность разнообразить форму**

```tsx
import React, {useCallback} from 'react';

import {createField, Form} from '@altiore/form';

export const Field = createField(
  ({error, name, label /* you can add any extra fields here: */}) => {
    return (
      <div>
        <label htmlFor="input-id">
          {label}
          <input id="input-id" name={name} ref="{inputRef}" />
        </label>
        <span>{error}</span>
      </div>
    );
  },
);

const MyForm = () => {
  const handleSubmit = useCallback((values) => {
    console.log('form.values is', values);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Field label="Field Label" name="name" />
      <button type="submit">Submit</button>
    </Form>
  );
};
```
