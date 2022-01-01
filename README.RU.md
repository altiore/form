# Altiore Form

`@altiore/form`

мощные формы от [**@altiore/form**](https://www.npmjs.com/package/@altiore/form)

<a href="https://www.npmjs.com/package/@altiore/form" target="_blank">
  <img src="https://img.shields.io/npm/v/@altiore/form.svg" alt="NPM Version" />
</a>

**английская версия**
[**README.md**](README.md)

## Зачем?

Чтобы облегчить и ускорить работу с формами. Если вы устали от страшно медленных форм React

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

## Кастомизируем поле ввода, добавляя в него доп. функции

**Позволяет кастомизировать внешний вид полей ввода, добавляет функционал валидации и несколько других полезных функций. [Кастомизированное поле ввода в деталях](.docs/create-field.ru.md)**
**Вы так же можете использовать [FieldArray](.docs/create-field-array.ru.md) для массивов**

```tsx
import React, {useCallback} from 'react';

import {createField, Form} from '@altiore/form';

/**
 * error и name добавляются вспомогательной функцией createField
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
            /* здесь вы можете добавить функции для валидации */
          ]
        }
      />
      <button type="submit">Submit</button>
    </Form>
  );
};
```

## Валидации форм

[Детальный пример валидации](.docs/valid.md)
