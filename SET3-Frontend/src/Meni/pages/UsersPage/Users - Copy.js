import React, { Component, useState, useEffect, useCallback } from 'react';
import List from './List';


 
const AddAUserForm = () => {
	return (
		<div>
		<button type="button">Add a new user</button>
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
		</div>
	);
};

export default AddAUserForm;