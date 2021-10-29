import React from 'react';

import {ArrayFieldProps, createArrayField} from '~/create-array-field';
import {Field} from '~/create-field/field';
import {minLength} from '~/validators';

export const ArrayTags = createArrayField<IFieldArray>(({list}) => {
	return (
		<div>
			{list.map(({key, remove}) => {
				return (
					<div key={key}>
						<Field label={'Tag'} name="tag" />
						<button onClick={remove}>remove tag</button>
					</div>
				);
			})}
			<button onClick={list.add} type="button">
				Добавить Тэг
			</button>
		</div>
	);
});

export interface IFieldArray extends ArrayFieldProps {
	label?: string;
}

export const ArrayField = createArrayField<IFieldArray>(({list}) => {
	return (
		<div>
			<Field label="Title" name="title" />
			{list.map(({key, remove, append, prepend}) => {
				return (
					<div key={key}>
						<div style={{display: 'flex'}}>
							<Field label={''} name="ingredient" validators={[minLength(3)]} />
							<ArrayTags name="tags" />
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
				Добавить ингредиент
			</button>
			<button type="submit">Submit</button>
		</div>
	);
});
