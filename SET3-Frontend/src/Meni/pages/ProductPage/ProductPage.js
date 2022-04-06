import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import List from './List';
import { useState, useEffect } from 'react';

function ProductPage(props) {

	const [allProducts, setAllProducts] = useState(null);

	const getData = async () => {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}ProductModels`);

		console.log(response);
		const data = await response.json();
		console.log(data);
		setAllProducts(data);
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

				{allProducts &&
					<>
						<h1> Products </h1>
						<List products={allProducts} />
					</>}
				{!allProducts && <h1>Loading...</h1>}

			</div>

		</div>
	)
}


export default ProductPage;