import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import List from './List';
import { useState, useEffect } from 'react';

function CashboxPage(props) {

	const data = [{ name: "Kasa 1", id: 1 }, { name: "Kasa 2", id: 2 }, { name: "Kasa 3", id: 3 }];
	const store = {
		"Name": "Poslovnica 2",
		"Adress": "Adresa",
		"StockId": 1,
		"Deleted": false
	}
	
	

	return (
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '90vh'
		}}
		>

			<div className="list" style={{ width: 500 }}>

				{data &&
					<>
					<div className="row">
						<div className="col">
							<div className="form-control">
								Name:
								
							</div>
						</div>
						<div className="col">
							<div className="form-control">
								{store.Name}
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
								{store.Adress}
							</div>
						</div>
					</div>
						<h1> Cash registers for the store </h1>
						<List sampleData={data} />
					</>}
				{!data && <h1>Loading...</h1>}

			</div>

		</div>
	)
}


export default CashboxPage;