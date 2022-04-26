import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import List from './List';
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import Box from '@mui/material/Box';

function ProductsInAShopForm() {
	const navigate = useNavigate();
	const [allProducts, setAllProducts] = useState(null);
	const [shop, setShop] = useState(null);
	const { id } = useParams();

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

		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/ProductShopIntertables/${id}`, requestOptions);
		ResponseCheckModule.unauthorizedResponseCheck(response, navigate)
		const data = await response.json();

		const responseProduct = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/ProductModels`, requestOptions);
		ResponseCheckModule.unauthorizedResponseCheck(response, navigate)
		const dataProduct = await responseProduct.json();

		const responseShop = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels/${id}`, requestOptions);
		const dataShop = await responseShop.json();
	
		var inShop = [];

		for (var i = 0; i < data.length; i++) {
			
			for (var j = 0; j < dataProduct.length; j++) {
				
				if (data[i].productId == dataProduct[j].id) {

					dataProduct[j].quantity = data[i].quantity // kolicina koja se dobije iz medjutabele je ona koju treba display-at
					inShop.push(dataProduct[j])

                }
            }
        }

		setAllProducts(inShop);
		
		setShop(dataShop)
		console.log('Prodavnica')
		console.log(shop)
	}

	useEffect(getData, []);



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

				{allProducts &&
					<>
						{shop && <h1 className="text-left pl-m m-0" style={{ fontSize: 40 }}> Products in this shop {shop.name}</h1>}
					<List products={allProducts} />
					</>}
				{!allProducts && <h1>Loading...</h1>}

			</div>

			</div>
			</Box>
	)
}


export default ProductsInAShopForm;