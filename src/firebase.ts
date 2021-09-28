import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyA6Hrc97i9zrvRWTu3SeyjiEEYX_QmTr9M",
	authDomain: "udemy-todo-51656.firebaseapp.com",
	databaseURL: "https://udemy-todo-51656.firebaseio.com",
	projectId: "udemy-todo-51656",
	storageBucket: "udemy-todo-51656.appspot.com",
	messagingSenderId: "234128017839",
	appId: "1:234128017839:web:2bb9ef4516ef1e6503875a"
});

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
