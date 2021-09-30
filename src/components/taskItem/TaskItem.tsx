import React, { FC, useState } from 'react';
import{ db } from "./../../firebase";
import { ListItem, Grid, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from "./TaskItem.module.css";

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
			<button onClick={editTask} className={styles.taskitem__icon}>
				<EditIcon />
			</button>
			<button onClick={deleateTask} className={styles.taskitem__icon}>
				<DeleteIcon />
			</button>
		</ListItem>
	)
}

export default TaskItem;
