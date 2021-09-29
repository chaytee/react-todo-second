import React, { FC, useState } from 'react';
import firebase from 'firebase/compat/app';
import{ db } from "./firebase";
import { ListItem, Grid, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

type PROPS = {
	id: string;
	title: string;
};

const TaskItem: FC<PROPS> = (props) => {
	const { id, title } = props;

	const [taskTitle, setTaskTitle] = useState(title);
	const onChangeTaskTitle = (e:React.ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value);
	const editTask = () =>{
		//title属性だけを書き換えたいのでmerge: true
		db.collection("tasks").doc(id).set({title: taskTitle}, {merge: true});
	};
	const deleateTask = () =>{
		db.collection("tasks").doc(id).delete();
	};


	return (
		<ListItem>
			<h2>{title}</h2>
			<Grid container justifyContent="flex-end">
				<TextField
				InputLabelProps={{
					shrink: true,
				}}
				label="edit task"
				value={taskTitle}
				onChange={onChangeTaskTitle}
				/>
			</Grid>
			<button onClick={editTask}>
				<EditIcon />
			</button>
			<button onClick={deleateTask}>
				<DeleteIcon />
			</button>
		</ListItem>
	)
}

export default TaskItem;
