import { Link, useParams } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import List from './List';
import { useState, useEffect } from 'react';

function CashboxPage(props) {
	const { id } = useParams();
	const [allCashRegisters, setAllCashRegisters] = useState(null);
	const [store, setStore] = useState(null);

	const getData = async () => {
		const responseC = await fetch(`${process.env.REACT_APP_BACKEND_URL}CashRegisterModels`);
		const c = await responseC.json();

		const responseS = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels/${id}`);
		const s = await responseS.json();

		const filtered = c.filter(c => c.shopId == id)

		setAllCashRegisters(filtered);
		setStore(s)
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
	)
}


export default CashboxPage;