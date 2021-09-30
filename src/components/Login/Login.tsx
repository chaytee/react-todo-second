import React, { FC, useState, useEffect } from 'react';
import styles from "./Login.module.css";
import { TextField, FormControl, Button, Typography } from '@material-ui/core';
import { auth } from '../../firebase';

export const Login:FC = (props:any) => {
	const [ isLogin, setIsLogin ] = useState(true);
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");

	useEffect(()=>{
		//firebaseのauthに接続し、user情報を得る
		auth.onAuthStateChanged((user)=>{
			user && props.history.push("/");
		});
	}, [props.history])

	//ユーザーが存在しない場合はログインページへ
	useEffect(() => {
		const unSub = auth.onAuthStateChanged((user) => {
		  user && props.history.push("/");
		});
		return () => unSub();
	  }, [props.history]);


	const onChangeloginMail = (e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

	const onChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

	const onClickSwichButton = () => setIsLogin(!isLogin);




	return (
		<div className={styles.login__root}>
			<h1>{ isLogin ? "Login" : "Register" }</h1>
			<br />
			<FormControl>
				<TextField
				InputLabelProps={{
						shrink: true,
					}}
				name="email"
				label="E-mail"
				value={email}
				onChange={onChangeloginMail}
					/>
			</FormControl>
			<br />
			<FormControl>
			<TextField
			InputLabelProps={{
						shrink: true,
				}}
			name="password"
			label="password"
			value={password}
			onChange={onChangePassword}
			/>
			</FormControl>
			<br />
			<Button variant="contained" color="primary" size="small" onClick={
          isLogin
            ? async () => {
                try {
                  await auth.signInWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error:any) {
                  alert(error.message);
                }
              }
            : async () => {
                try {
                  await auth.createUserWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error:any) {
                  alert(error.message);
                }
              }
        }>
				{isLogin ? "login" : "register"}
			</Button>
			<br />
			<Typography align="center">
				<span onClick={onClickSwichButton}>
					{isLogin ? "Create new account ?" : "Back to login"}
				</span>
			</Typography>
		</div>

	)
};
