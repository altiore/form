# Altiore Form

`@altiore/form`

Productive, flexible and extensible forms with easy-to-use validation and the most user-friendly API [**@altiore/form**](https://www.npmjs.com/package/@altiore/form)

<a href="https://www.npmjs.com/package/@altiore/form" target="_blank">
  <img src="https://img.shields.io/npm/v/@altiore/form.svg" alt="NPM Version" />
</a>

**русская версия**
[**README.RU.md**](README.RU.md)

## Why?

Let's face it, forms in React are verbose and awkward.
This library will help facilitate and speed up the work with forms.
It solves the following main problems:

1. Form validation
2. Sending data management
3. Convenient customization of reusable form components (inputs, selects,...)

### Peculiarity:

This library, unlike most others, does not store the state of input fields.
Within the [**@altiore/form**](https://www.npmjs.com/package/@altiore/form) library, we consider that the data entered into the form is stored on the page.
If you need to provide data storage from inputs - you have complete freedom to implement this using your favorite state manager.

> This feature means that if you hide the input fields, the data will not be stored.

> In other words: hiding data should be equivalent to sending, and at the time of hiding data, you need to save them using your favorite state manager

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
 * "error" here is added by createField
 * "name" and "label" comes from usage area
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
    console.log('form.values is', values);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Label"
        name="name"
        validate={/* you can add validators here */}
      />
      <button type="submit">Submit</button>
    </Form>
  );
};
```

## Validation

> We prefer field-level validation. By analogy with
> as it is implemented in the browser.
> But you can also validate all data at the time of sending

```tsx
import React, {useCallback} from 'react';

import {Form, isEmail, isRequired} from '@altiore/form';

const tooShort = (value) => {
  if (value.length < 5) {
    return 'Too short';
  }
};

const MyForm = () => {
  const handleSubmit = useCallback((values) => {
    console.log('form.values is', values);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Field label="Email" name="email" validate={[isRequired(), isEmail()]} />
      <Field label="Long" name="long" validate={tooShort} />
      <button type="submit">Submit</button>
    </Form>
  );
};
```

#### You can also validate form values while sending them

```tsx
import React, {useCallback} from 'react';

import {Form, isEmail, isRequired} from '@altiore/form';

const validate = (values) => {
  const errors = {};
  if (values.long?.length < 5) {
    errors.long = 'Too short';
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
    console.log('Correct data for sending', values);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Field label="Long" name="long" />
      <button type="submit">Submit</button>
    </Form>
  );
};
```

## With Typescript

```tsx
import React, {useCallback} from 'react';

import {FieldProps, createField, Form} from '@altiore/form';

interface IField {
  label: string;
}

/**
 * "error" here is added by createField
 * "name" and "label" comes from usage area
 */
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
    console.log('form.values is', values);
  }, []);

  return (
    <Form<FormState> onSubmit={handleSubmit}>
      <Field<FormState>
        label="Label"
        name="name"
        validate={/* you can add validators here */}
      />
      <button type="submit">Submit</button>
    </Form>
  );
};
```

## Detailed Example

```tsx
import React, {useCallback} from 'react';

import {
  FieldProps,
  createField,
  createFieldArray,
  createSubmit,
  Form,
  isRequired,
} from '@altiore/form';

interface IField {
  label: string;
}

const FieldView = createField<IField>(
  ({error, name, label}: FieldProps<IField>) => {
    return (
      <div>
        <label>{label}</label>
        <input name={name} />
        <span>{error}</span>
      </div>
    );
  },
);

export interface IFieldArray {
  label?: string;
}

export const FieldIngredients = createFieldArray<IFieldArray>(({list}) => {
  const renderIng = useCallback(({key, remove}) => {
    return (
      <div key={key}>
        <div>
          <div>
            <button onClick={remove} type="button">
              -
            </button>
          </div>
          <div>
            <Field label="Title" name="title" validate={[isRequired(null)]} />

            <Field label="Desc" name="desc" />
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <>
      {list.map(renderIng)}
      <button onClick={list.add} type="button">
        Add Ingredient
      </button>
    </>
  );
});

export interface ISubmit {
  children: string;
  className?: string;
  skipUntouched?: boolean;
}

export const Submit = createSubmit<ISubmit>(
  ({isInvalid, isSubmitting, isUntouched, ...props}: SubmitProps<ISubmit>) => {
    return (
      <button {...props} disabled={isInvalid || isSubmitting || isUntouched} />
    );
  },
);

interface FormState {
  name: string;
}

const MyForm = () => {
  const handleSubmit = useCallback((values: FormState) => {
    console.log('form.values is', values);
  }, []);

  return (
    <Form<FormState> onSubmit={handleSubmit}>
      <Field<FormState> label="Label" name="name" validate={isRequired(null)} />
      <FieldIngredients label="Ingredients" name="ingredients" />
      <Submit>Submit</Submit>
    </Form>
  );
};
```

[Validation detailed example](.docs/valid.md)
