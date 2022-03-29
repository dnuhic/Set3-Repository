import React, { Component, useState, useEffect, useCallback } from 'react';
import List from './List';


 
const Users = () => {
	const [allUsers, setAllUsers] = useState(null);
	const [allUsersFetched, setAllUsersFetched] = useState(false);

	const getData = async () => {
		const response = await fetch('https://localhost:7194/usermodels');

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

			<div className="list">
				<h1> Users </h1>
				{allUsers && <List sampleData={allUsers} />}
				{!allUsers && <div>Loading...</div>}
				
			</div>

		</div>		
	);
};

export default Users;