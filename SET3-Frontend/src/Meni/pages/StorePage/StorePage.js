import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import List from './List';
import { useState, useEffect } from 'react';

function StorePage(props) {

	const [allStores, setAllStores] = useState(null);

	const getData = async () => {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/ShopModels`);

		console.log(response);
		const data = await response.json();
		console.log(data);
		setAllStores(data);
	}

	useEffect(getData, [])


	return (
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '90vh'
		}}
		>

			<div className="list" style={{ width: 500 }}>

				{allStores &&
					<>
						<h1> Stores </h1>
						<List sampleData={allStores} />
					</>}
				{!allStores && <h1>Loading...</h1>}

			</div>

		</div>
	)
}


export default StorePage;