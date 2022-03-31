import React, { Component, useState, useEffect, useCallback } from 'react';
import List from './List';


 
const Users = () => {
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

		const response = await fetch('https://set3-backend20220330235604.azurewebsites.net//usermodels', requestOptions);

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
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '90vh'
		}}
		>

			<div className="list" style={{width:500}}>
				<h1> Users </h1>
				{allUsers && <List sampleData={allUsers} />}
				{!allUsers && <div>Loading...</div>}
				
			</div>

		</div>		
	);
};

export default Users;