import {useState, useEffect} from 'react';
import{ db } from "./firebase";
import './App.css';

const App:React.FC = () => {
	const [tasks, setTasks] = useState([{id:"", title:""}])
	useEffect(() => {
		const unSub = db.collection("tasks").onSnapshot((snapshot:any)=> {
			setTasks(
				snapshot.docs.map((doc:any)=>({id: doc.id, title:doc.data().title}))
				);
		});
		return ()=> unSub();
		}
	, [])

	return (
		<div className="App">
			{tasks.map((task) => <h3>{task.title}</h3>)}
		</div>
	  );
}


export default App;
