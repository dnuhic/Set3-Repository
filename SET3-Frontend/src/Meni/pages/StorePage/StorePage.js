import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import List from './List';
import { useState, useEffect } from 'react';
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import Box from '@mui/material/Box';

function StorePage(props) {

	const navigate = useNavigate()
	const [allStores, setAllStores] = useState(null);

	function getCookie(key) {
		var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
		return b ? b.pop() : "";
	}

	const getData = async () => {
		const requestOptions = {
			method: "GET",
			headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
			credentials: 'same-origin'
		};
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels`, requestOptions);
		ResponseCheckModule.unauthorizedResponseCheck(response, navigate)


		console.log(response);
		const data = await response.json();
		console.log(data);
		setAllStores(data);
	}

	useEffect(getData, [])


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

			<div className="list" style={{ width: 500 }}>

				{allStores &&
					<>
						<h1> Stores </h1>
						<List stores={allStores} />
					</>}
				{!allStores && <h1>Loading...</h1>}

			</div>

			</div>
			</Box>
	)
}


export default StorePage;