import {FC, useState, useEffect} from 'react';
import{ auth, db } from "./firebase";
import styles from "./App.module.css";
import { FormControl, TextField, List } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TaskItem from './components/taskItem/TaskItem';
import { makeStyles } from '@material-ui/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
	field: {
		marginTop: 30,
		marginBottom: 20,
	},
	list: {
		margin: "auto",
		width: "80%",
	}
});

const App: FC = (props:any) => {
	const [tasks, setTasks] = useState([{id:"", title:""}])
	const[input, setInput] = useState("");
	const classes = useStyles();

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
	};


	return (
		<div className={styles.app__root}>
			<h1>Todp App React/Firebase</h1>
			<button className={styles.app__logout} onClick={ async () => {
          try {
            await auth.signOut();
            props.history.push("login");
          } catch (error:any) {
            alert(error.message);
          }
        }}>
			logout<ExitToAppIcon />
			</button>
			<FormControl>
				<TextField className={classes.field}
				InputLabelProps={{
					shrink: true,
				}}
				label="New task?"
				value={input}
				onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
				 />
			</FormControl>
			<button disabled={!input} onClick={newTask} className={styles.app__icon}>
				<AddCircleOutlineIcon />
			</button>
			<div>
				<List className={classes.list}>
					{tasks.map((task) => (
						<TaskItem key={task.id} id={task.id} title={task.title} />
					))}
				</List>
			</div>
		</div>
	  );
}


export default App;
