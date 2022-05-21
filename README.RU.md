# Altiore Form

`@altiore/form`

Производительные гибкие и легко расширяемые формы с простой в использовании валидацией и наиболее удобным API [**@altiore/form**](https://www.npmjs.com/package/@altiore/form)

<a href="https://www.npmjs.com/package/@altiore/form" target="_blank">
  <img src="https://img.shields.io/npm/v/@altiore/form.svg" alt="NPM Version" />
</a>

**английская версия**
[**README.md**](README.md)

## Зачем?

Давайте смотреть правде в глаза, формы в React многословны и неудобны
Эта библиотека поможет облегчить и ускорить работу с формами.
Она выполняет следующие основные задачи:

1. Валидация форм
2. Управление отправкой данных
3. Удобная кастомизация переиспользуемых компонентов формы (инпутов, селектов,...)

### Особенность:

Эта библиотека, в отличие от большинства других подобных, не хранит состояние полей ввода.
В рамках @altiore/form мы считаем, что данные, введенные в форму, хранятся на странице.
Если вам нужно обеспечивать хранение данных из инпутов - у вас есть полная свобода реализовать это, используя ваш любимый менеджер состояний.
Это особенность означает, что если вы скроете поля для ввода, данные не будут отправлены.
Другими словами: скрытие данных должно быть эквивалентно отправке и в момент скрытия данных нужно их сохранять, используя ваш любимый менеджер состояний

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
    console.log('Переменные формы:', values);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <input name="name" />
      <button type="submit">Отправить</button>
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
 * error здесь добавляются вспомогательной функцией createField
 * name и label приходят из свойств, указанных в месте использования
 */
const FieldView = ({error, name, label}) => {
  return (
    <div>
      <label>{label}</label>
      <input name={name} />
      <span>{error}</span>
    </div>
  );
};

export const Field = createField(FieldView);

const MyForm = () => {
  const handleSubmit = useCallback((values) => {
    console.log('Переменные формы', values);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Имя"
        name="name"
        validate={/* здесь вы можете добавить функцию/массив функций для валидации */}
      />
      <button type="submit">Отправить</button>
    </Form>
  );
};
```

## Валидации форм

> Мы предпочитаем валидацию полей на уровне поля. По аналогии с тем,
> как это реализовано в браузере.
> Но вы можете так же валидировать все данные в момент отправки

```tsx
import React, {useCallback} from 'react';

import {Form, isEmail, isRequired} from '@altiore/form';

const tooShort = (value) => {
  if (value.length < 5) {
    return 'Слишком коротко';
  }
};

const MyForm = () => {
  const handleSubmit = useCallback((values) => {
    console.log('Переменные формы:', values);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Field label="E-mail" name="email" validate={[isRequired(), isEmail()]} />
      <Field label="Длинное имя" name="long" validate={tooShort} />
      <button type="submit">Отправить</button>
    </Form>
  );
};
```

#### Вы можете валидировать данные и глобально тоже:

```tsx
import React, {useCallback} from 'react';

import {Form, isEmail, isRequired} from '@altiore/form';

const validate = (values) => {
  const errors = {};
  if (values.long?.length < 5) {
    errors.long = 'Слишком коротко';
  }

  return errors;
};

const MyForm = () => {
  const handleSubmit = useCallback((values, setErrors) => {
    const errors = validate(values);
    if (Object.keys(errors)?.length) {
      setErrors(errors);
      return;
    }
    console.log('Верные данные для отправки:', values);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Field label="Длинное имя" name="long" />
      <button type="submit">Отправить</button>
    </Form>
  );
};
```

## С использованием TypeScript:

```tsx
import React, {useCallback} from 'react';

import {FieldProps, createField, Form} from '@altiore/form';

interface IField {
  label: string;
}

const FieldView = ({error, name, label}: FieldProps<IField>) => {
  return (
    <div>
      <label>{label}</label>
      <input name={name} />
      <span>{error}</span>
    </div>
  );
};

export const Field = createField<IField>(FieldView);

interface FormState {
  name: string;
}

const MyForm = () => {
  const handleSubmit = useCallback((values: FormState) => {
    console.log('Переменные формы:', values);
  }, []);

  return (
    <Form<FormState> onSubmit={handleSubmit}>
      <Field<FormState>
        label="Имя"
        name="name"
        validate={/* ты можешь добавить функцию/массив функций для валидации здесь */}
      />
      <button type="submit">Отправить</button>
    </Form>
  );
};
```

[Детальный пример валидации](.docs/valid.md)
