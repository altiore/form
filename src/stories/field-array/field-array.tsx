import React, {useCallback} from 'react';

import {FieldArrayProps, createFieldArray} from '~/create-field-array';
import Field from '~/stories/field';
import {FieldNumber} from '~/stories/field-typed';
import {minLength} from '~/validators';

export const TagsArray = createFieldArray<FieldArrayProps>(({list}) => {
	const cb = useCallback(({key, remove}) => {
		return (
			<div key={key}>
				<Field label={'Tag'} name="tag" />
				<FieldNumber label="Amount" name="amount" />
				<button onClick={remove}>remove tag</button>
			</div>
		);
	}, []);

	return (
		<div>
			{list.map(cb)}
			<button onClick={list.add} type="button">
				Добавить Тэг
			</button>
		</div>
	);
});

export interface IFieldArray extends FieldArrayProps {
	label?: string;
}

export const FieldArray = createFieldArray<IFieldArray>(({list, errors}) => {
	const cb = useCallback(({key, remove, append, prepend}) => {
		return (
			<div key={key}>
				<div style={{display: 'flex'}}>
					<Field label={''} name="ingredient" validators={[minLength(3)]} />
					<TagsArray name="tags" />
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
	}, []);

	return (
		<div>
			<div>{errors[0]}</div>
			{list.map(cb)}
			<button onClick={list.add} type="button">
				Добавить ингредиент
			</button>
		</div>
	);
});

export const FieldArraySimplest = createFieldArray<IFieldArray>(({list}) => {
	const cb = useCallback(({key, remove}) => {
		return (
			<div key={key}>
				<div style={{display: 'flex'}}>
					<Field label="Title" name="title" validators={[minLength(3)]} />
					<Field label="Description" name="desc" validators={[minLength(3)]} />
					<button onClick={remove} type="button">
						-
					</button>
				</div>
			</div>
		);
	}, []);

	return (
		<>
			{list.map(cb)}
			<button onClick={list.add} type="button">
				Добавить ингредиент 1
			</button>
		</>
	);
});

export const FieldArrayWithAddingDefValue = createFieldArray<IFieldArray>(
	({list}) => {
		const cb = useCallback(({key, remove}) => {
			return (
				<div key={key}>
					<div style={{display: 'flex'}}>
						<Field label="Title" name="title" validators={[minLength(3)]} />
						<Field
							label="Description"
							name="desc"
							validators={[minLength(3)]}
						/>
						<button onClick={remove} type="button">
							-
						</button>
					</div>
				</div>
			);
		}, []);

		const handleAdd = useCallback(() => {
			list.add({
				desc: 'добавленное описание',
				title: 'Добавленные заголовок',
			});
		}, [list.add]);

		return (
			<>
				{list.map(cb)}
				<button onClick={handleAdd} type="button">
					Добавить ингредиент 1
				</button>
			</>
		);
	},
);
