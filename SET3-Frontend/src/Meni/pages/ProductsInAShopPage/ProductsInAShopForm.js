import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import List from './List';
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"

function ProductsInAShopForm() {
	const navigate = useNavigate();
	const [allProducts, setAllProducts] = useState(null);
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
	}

	useEffect(getData, []);



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
						<h1> Products in this shop</h1>
					<List products={allProducts} />
					</>}
				{!allProducts && <h1>Loading...</h1>}

			</div>

		</div>
	)
}


export default ProductsInAShopForm;