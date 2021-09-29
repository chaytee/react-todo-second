import {FC, useState, useEffect} from 'react';
import{ db } from "./firebase";
import './App.css';
import { FormControl, TextField, List } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TaskItem from './TaskItem';

const App: FC = () => {
	const [tasks, setTasks] = useState([{id:"", title:""}])
	const[input, setInput] = useState("");

	useEffect(() => {
		//.onSnapshotデータベースの情報を取得(変更がある度)
		//mapで展開する
		//title:doc.data().titleの.titleはfirebaseの属性
		const unSub = db.collection("tasks").onSnapshot((snapshot:any)=> {
			setTasks(
				snapshot.docs.map((doc:any)=>({id: doc.id, title:doc.data().title}))
				);
		});
		//アンマウントされたときクリーンアップ
		return ()=> unSub();
		}
	, [])//一回のみデータを取得

	const newTask = (e:React.MouseEvent<HTMLButtonElement>)=> {
		//eの型についてはonClickをホバーして表示されたものをコピー
		//データベースのtasksに追加
		//IDについては自動で取得する
		db.collection("tasks").add({title: input});
		//次の入力のために初期化
		setInput("");
	}

	return (
		<div className="App">
			<h1>Todp App React/Firebase</h1>
			<FormControl>
				<TextField
				InputLabelProps={{
					shrink: true,
				}}
				label="New task?"
				value={input}
				onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
				 />
			</FormControl>
			<button disabled={!input} onClick={newTask}>
				<AddCircleOutlineIcon />
			</button>
			<List>
				{tasks.map((task) => (
					<TaskItem key={task.id} id={task.id} title={task.title} />
				))}
			</List>
		</div>
	  );
}


export default App;
