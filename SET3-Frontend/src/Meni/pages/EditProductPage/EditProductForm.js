import React, { Component, useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import Box from '@mui/material/Box';
import { Button } from '../../../globalStyles';

function EditProductForm() {

    const navigate = useNavigate();
    // podaci iz baze:
    const [product, setProduct] = useState(null);

    const [updatedProduct, setUpdatedProduct] = useState(null);

    const [name, setName] = useState("");
    const [stock, setStock] = useState(null);
    const [category, setCategory] = useState(null);    
    const [price, setPrice] = useState(null);
    const [stocks, setStocks] = useState(null);
    const [categories, setCategories] = useState(null);   

    const { id } = useParams();

    // EDIT PRODUCT
    const editProduct = () => {

        var noviId;
        for (let i = 0; i < stocks.length; i++) {
            if (stocks[i].name == stock) {
                noviId = stocks[i].id;
                break;
            }
        }

        // TODO: OVO ZA BARCODE I QUANTITY IZMIJENITIIIIIII

        const newProduct = {
            Id: product.id,
            StockId: noviId,
            Name: document.getElementById("name").value,
            CategoryName: category,
            //Price: product.price,
            Price: document.getElementById("price").value,
            Deleted: product.deleted,
            Barcode: product.barcode,
            BarcodeText: product.barcodeText,
            Quantity: product.quantity
        };

        console.log("NEW PRODUCT: ");
        console.log(newProduct);

        setUpdatedProduct(newProduct);
    }

    const getData = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };

        // Check if these are the correct URLs
        const responseProduct = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/productmodels/${id}`, requestOptions);
        ResponseCheckModule.unauthorizedResponseCheck(responseProduct, navigate)
        const dataProduct = await responseProduct.json();
        const responseCategory = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/CategoryModels`)
        const dataCategories = await responseCategory.json();

        const responseStocks = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/StockModels`)
        const dataStocks = await responseStocks.json();

        var noviName;
        for (let i = 0; i < dataStocks.length; i++) {
            if (dataStocks[i].id == dataProduct.stockId) {
                noviName = dataStocks[i].name;
                break;
            }
        }

        setProduct(dataProduct);
        setName(dataProduct.name);
        setPrice(dataProduct.price);
        setStock(noviName);
        setCategory(dataProduct.categoryName);
        setCategories(dataCategories);
        setStocks(dataStocks);
        console.log(dataProduct);
    };

    useEffect(getData, []);

    useEffect(async () => {
        if (product != null && updatedProduct != null) {
            console.log(updatedProduct);
            const requestOptions = {
                method: "POST",
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
                credentials: 'same-origin'
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/productmodels/${product.id}`, requestOptions);


            console.log("OVO ERROR BACA ");
            console.log(response);


            alert("Changes have been saved succesfully!")
        }

    }, [updatedProduct]);

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }
    const handleStockChange = (e) => {
        setStock(e.target.value)
    }
    const createCategory = () => {
        navigate('/addnewcategory');
    }

    return (
        <Box sx={{
            width: '40%',
            padding: '20px',
            height: '40%',
            bgcolor: '#a8c0c0',
            boxShadow: 16,
            borderRadius: '0 0 20px 20px',
            position: 'relative',
            overflow: 'auto',
            margin: 'auto'
        }}>
            {categories &&  stocks && < form className="unos">
                <div className="col">
                    <h1>Edit product</h1>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <input value={name}
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder="Product name"
                                onChange={handleNameChange}
                            />


                            <input value={price}
                                id="price"
                                type="text"
                                className="form-control"
                                placeholder="Product price"
                                onChange={handlePriceChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">

                        <div className="form-click">
                            <div className="form-box">
                                <select name="role" id="role" className="category" value={category} onChange={handleCategoryChange}>
                                    {categories && categories.length &&
                                        categories.map(q => <option value={q.name}>{q.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                        <button
                            type="button"
                            onClick={createCategory}
                        >
                            Create new category
                        </button>
                    
                
                <div className="row">
                    <div className="col">

                        <div className="form-click">
                            <div className="form-box">
                                <select name="role" id="role" className="stock" value={stock} onChange={handleStockChange}>
                                    {stocks && stocks.length &&
                                        stocks.map(q => <option value={q.name}>{q.name}</option>)
                                    }
                                </select>
                             </div>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={editProduct}
                >
                    Edit product
                </button>
                
            </form>}
            {(!categories || !stocks) && <h1>Loading...</h1>}
           
        </Box>

    );
}

export default EditProductForm;