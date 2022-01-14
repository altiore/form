import React, {useCallback} from 'react';

import {FieldArrayProps, createFieldArray} from '~/create-field-array';
import Field from '~/stories/field';
import {FieldNumber} from '~/stories/field-typed';
import {minLength} from '~/validators';

export const TagsArray = createFieldArray<FieldArrayProps>(({list}) => {
	const cb = useCallback(({key, remove}) => {
		return (
			<div className="w-75 mb-3" key={key}>
				<div className="shadow border border-secondary rounded-3 mb-3 p-3">
					<div className="d-flex justify-content-end">
						<button className="btn btn-outline-danger" onClick={remove}>
							<img src="dash.svg" />
						</button>
					</div>
					<Field label={'Метка'} name="tag" />
					<FieldNumber label="Количество" name="amount" />
				</div>
			</div>
		);
	}, []);

	return (
		<div>
			{list.map(cb)}
			<button
				className="btn btn-outline-success"
				onClick={list.add}
				type="button">
				<img src="plus.svg" />
				ДОБАВИТЬ
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
			<div className="w-75 mt-3" key={key}>
				<button
					className="btn btn-outline-success mb-3"
					onClick={prepend}
					type="button">
					Добавить до
				</button>
				<div className="shadow border border-secondary rounded-3 mb-3 p-3">
					<div>
						<div className="d-flex justify-content-end">
							<button className="btn btn-outline-danger" onClick={remove}>
								<img src="dash.svg" />
							</button>
						</div>

						<Field
							label={'Название'}
							name="ingredient"
							validators={[minLength(null, 3)]}
						/>

						<TagsArray name="tags" />
					</div>
				</div>
				<button
					className="btn btn-outline-success mb-3"
					onClick={append}
					type="button">
					Добавить после
				</button>
			</div>
		);
	}, []);

	return (
		<div>
			<div>{errors[0]}</div>
			{list.map(cb)}
			<button
				className="btn btn-outline-success"
				onClick={list.add}
				type="button">
				Добавить массив полей
			</button>
		</div>
	);
});

export const FieldArraySimplest = createFieldArray<IFieldArray>(({list}) => {
	const cb = useCallback(({key, remove}) => {
		return (
			<div className=" w-75 mt-3" key={key}>
				<div className="shadow border border-secondary rounded-3 mb-3 p-3">
					<div className="d-flex justify-content-end">
						<button
							className="btn btn-outline-danger h-50 "
							onClick={remove}
							type="button">
							<img src="/dash.svg" />
						</button>
					</div>
					<div>
						<Field
							label="Название"
							name="title"
							validators={[minLength(null, 3)]}
						/>

						<Field
							label="Описание"
							name="desc"
							validators={[minLength(null, 3)]}
						/>
					</div>
				</div>
			</div>
		);
	}, []);

	return (
		<>
			{list.map(cb)}
			<button
				className="btn btn-outline-success"
				onClick={list.add}
				type="button">
				Добавить массив
			</button>
		</>
	);
});

export const FieldArrayWithAddingDefValue = createFieldArray<IFieldArray>(
	({list}) => {
		const cb = useCallback(({key, remove}) => {
			return (
				<div key={key}>
					<div className="shadow border border-secondary rounded-3 mb-3 p-3 w-75">
						<div className="d-flex justify-content-end">
							<button
								className="btn btn-outline-danger h-50 "
								onClick={remove}
								type="button">
								<img src="/dash.svg" />
							</button>
						</div>
						<Field
							label="Название"
							name="title"
							validators={[minLength(null, 3)]}
						/>
						<Field
							label="Описание"
							name="desc"
							validators={[minLength(null, 3)]}
						/>
					</div>
				</div>
			);
		}, []);

		const handleAdd = useCallback(() => {
			list.add({
				desc: 'Добавленное описание',
				title: 'Добавленный заголовок',
			});
		}, [list.add]);
		return (
			<>
				<div className="row g-3 mb-3">
					{list.map(cb)}
					<div className="col-auto">
						<button
							className="btn btn-outline-success"
							onClick={handleAdd}
							type="button">
							Добавить конкретный массив
						</button>
					</div>
					<div className="col-auto">
						<button
							className="btn btn-outline-success"
							onClick={list.add}
							type="button">
							Добавить пустой массив
						</button>
					</div>
				</div>
			</>
		);
	},
);
