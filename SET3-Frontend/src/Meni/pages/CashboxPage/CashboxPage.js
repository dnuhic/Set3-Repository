import { Link, useParams } from 'react-router-dom';
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

function CashboxPage(props) {
	const navigate = useNavigate()
	const { id } = useParams();
	const [allCashRegisters, setAllCashRegisters] = useState(null);
	const [store, setStore] = useState(null);

	function getCookie(key) {
		var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
		return b ? b.pop() : "";
	}

	const getData = async () => {
		const requestOptions = {
			method: 'GET',
			headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
			credentials: 'same-origin'
		};
		const responseC = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/CashRegisterModels`, requestOptions);
		//ResponseCheckModule.unauthorizedResponseCheck(responseC, navigate)
		const c = await responseC.json();
		console.log(c);

		const responseS = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels/${id}`, requestOptions);
		ResponseCheckModule.unauthorizedResponseCheck(responseS, navigate)
		const s = await responseS.json();

		const filtered = c.filter(c => c.shopId == id)

		setAllCashRegisters(filtered);
		setStore(s)
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

				{allCashRegisters && store &&
					<>
					<h1> Store </h1>
					<div className="row">
						<div className="col">
							<div className="form-control">
								Name:
								
							</div>
						</div>
						<div className="col">
							<div className="form-control">
								{store.name}
								</div>
							</div>
					</div>
					<div className="row">
						<div className="col">
							<div className="form-control">
								Adress:

							</div>
						</div>
						<div className="col">
							<div className="form-control">
								{store.adress}
							</div>
						</div>
					</div>
					<h1> Cash registers for the store </h1>
					<List sampleData={allCashRegisters} />
					</>}
				{!allCashRegisters && !store && <h1>Loading...</h1>}

			</div>

			</div>
			</Box>
	)
}


export default CashboxPage;