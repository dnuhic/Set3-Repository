import React, { Component, useState, useEffect, useCallback } from 'react';
import List from './List';
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom"



 
const Users = () => {

	const navigate = useNavigate()
	const [allUsers, setAllUsers] = useState(null);
	const [allUsersFetched, setAllUsersFetched] = useState(false);

	function getCookie(key) {
		var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
		return b ? b.pop() : "";
	}

	const getData = async () => {

		console.log(getCookie("jwt"));

		const requestOptions = {
			method: 'GET',
			headers: { "Authorization": "bearer " + getCookie("jwt") ,"Access-Control-Allow-Credentials": true },
			credentials: 'same-origin'
		};

		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}usermodels`, requestOptions);
		ResponseCheckModule.unauthorizedResponseCheck(response, navigate)

		console.log(response);
		const data = await response.json();
		console.log(data);
		setAllUsers(data);
	}

	useEffect(getData, [])

	useEffect(() => {
		setAllUsersFetched(true);
	}, [allUsers])


	return (
		<Box sx={{
			width: '30%',
			padding: '20px',
			height: '40%',
			bgcolor: '#a8c0c0',
			boxShadow: 16,
			borderRadius: '0 0 20px 20px',
			position: 'relative',
			overflow: 'auto',
			margin: 'auto'
		}}>
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}
		>

			<div className="list" style={{width:500}}>
				
				{allUsers &&
					<>
						<h1> Users </h1>
						<List sampleData={allUsers} />
					</>}
				{!allUsers && <h1>Loading...</h1>}
				
			</div>

			</div>
			</Box>
	);
};

export default Users;