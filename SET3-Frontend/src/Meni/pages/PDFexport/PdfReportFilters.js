import React, { Component, useEffect, useState } from 'react';
import './pdfReportStyle.css';
/*import '../styleForm.css';*/
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';

export default function PdfReportFilters() {

    const [shops, setShops] = useState(null);
    const [cashRegisters, setCashRegisters] = useState(null);
    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    const [exportType, setExportType] = useState(null);

    const navigate = useNavigate()


    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    useEffect(async () => {

       /*
        const responseShop = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels`, requestOptionsShop);
        ResponseCheckModule.unauthorizedResponseCheck(responseShop, navigate)
        const dataShop = await responseShop.json();
        var filterDataShop = dataShop.filter(s => !s.deleted)
        setShops(filterDataShop);
        setStore(filterDataShop[0].id)*/

        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };

        const responseCategory = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/CategoryModels`, requestOptions);
        ResponseCheckModule.unauthorizedResponseCheck(responseCategory, navigate)
        const dataCategory = await responseCategory.json()

        const responseProducts = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/ProductModels`, requestOptions);
        ResponseCheckModule.unauthorizedResponseCheck(responseProducts, navigate)
        const dataProducts = await responseProducts.json();

        const responseShops = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels`, requestOptions);
        ResponseCheckModule.unauthorizedResponseCheck(responseShops, navigate)
        const dataShops = await responseShops.json();

        //osmisliti kako za cashRegister trebat ce nam id
        setCategories(dataCategory);
        setProducts(dataProducts);
        setShops(dataShops);

        console.log(categories);
        console.log(products);
        console.log(shops);

    }, []);

    function handleFilterButtonClickRT() {
        var filterDiv = document.getElementById("pomocniFilteri")
        if (filterDiv.style.display != 'none')
            filterDiv.style.display = 'none'
        else
            filterDiv.style.display = 'flex'
    }


    function handleSubmit() {
     
    }

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
            <h1>Adjust your PDF report</h1>
            
            {products && shops && categories &&
                <div className="mainDiv">
                <div className="mainFilterDiv">
                
                <div>
                    <label for="shop">Filter by shop</label>
                    <select>
                        {shops && shops.map(x => <option>{x.name}</option>)}
                    </select>
                </div>
                    <br />
                <button onClick={handleFilterButtonClickRT}>
                        <img src={require("./filter2.png")} alt="filter icon" width="23" height="23"></img>
                </button>
                <div id="pomocniFilteri">
                    <div>
                    <label for="name">Filter by name</label>
                    <select>
                        {products && products.map(x => <option>{x.name}</option>)}
                        </select>
                       
                    </div>
                    <br />
                <div>
                    <label for="category">Filter by category</label>
                    <select>
                        {categories && categories.map(x => <option>{x.name}</option>)}
                    </select>
                    </div>
                    </div>

                    </div>
            </div>
            }
            {
                !shops && <h1>Shops Loading...</h1>
            }
            {
                !products && <h1>Products Loading...</h1>
            }
            {
                !categories && <h1>Categories Loading...</h1>
            }
        </Box>
    )
}