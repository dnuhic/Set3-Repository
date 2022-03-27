import React from 'react';
import List from './List';
import data from './data';


 
const Users = () => {
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
				<List sampleData={data} />
				
			</div>

		</div>

		


		
	);
};

export default Users;