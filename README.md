# Altiore Form

`@altiore/form`

powerful forms with [**@altiore/form**](https://www.npmjs.com/package/@altiore/form)

<a href="https://www.npmjs.com/package/@altiore/form" target="_blank">
  <img src="https://img.shields.io/npm/v/@altiore/form.svg" alt="NPM Version" />
</a>

**русская версия**
[**README.RU.md**](README.RU.md)

## Why?

To simplify work with forms

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
