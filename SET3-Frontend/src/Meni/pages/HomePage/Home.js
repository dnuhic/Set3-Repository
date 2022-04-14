import React from 'react';
import Box from '@mui/material/Box';

const Home = () => {
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

			<h1> Home </h1>

			</div>
			</Box>
	);
};

export default Home;