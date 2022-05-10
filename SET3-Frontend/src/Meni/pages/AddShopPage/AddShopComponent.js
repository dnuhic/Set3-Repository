import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Box from '@mui/material/Box';

import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"

const AddShopComponent = () => {

    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [shopStocks, setShopStocks] = useState(null);

    const [defaultStock, setDefaultStock] = useState(null);

    const [selectedStock, setSelectedStock] = useState(null);
    const receiptTypes = ['Bosanski', 'Hrvatski'];
    const [defaultReceipt, setDefaultReceipt] = useState(null);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    const addShop = () => {
        if (name === undefined || name === null || name === "") {
            alert("Name cannot be empty!");
        }

        if (address === undefined || address === null || address === "") {
            alert("Address cannot be empty!");
        }

        if (name !== undefined && name !== null && name !== "" && address !== undefined && address !== null && address !== "") {
            let body = {
                name: name,
                adress: address
            }
            if (selectedStock !== null) {
                body.stockId = parseInt(selectedStock)
            }
            if (selectedReceipt !== null) {
                body.receiptType = selectedReceipt
            } else {
                body.receiptType = defaultReceipt
            }
            console.log("Tijelo je: ", body);
            const requestOptions = {
                method: 'POST',
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify(body)
            };
            fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels`, requestOptions)
                .then(response => {
                    ResponseCheckModule.unauthorizedResponseCheck(response, navigate)
                    if (response.ok)
                        return response.json()
                    else
                        throw new Error("There was an error!");
                })
                .then(data => {
                    alert("Shop was succesfully added!");
                    setName("");
                    setAddress("");
                    if(selectedReceipt !== null)
                        setDefaultReceipt(selectedReceipt)
                    setSelectedReceipt(null);
                    console.log("Success!");
                })
                .catch(err => {
                    alert(err.message);
                    console.log("Error: ", err.message)
                });

        }


    }

    const getStocks = () => {
        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };
        fetch(`${process.env.REACT_APP_BACKEND_URL}api/StockModels`, requestOptions)
            .then(response => { ResponseCheckModule.unauthorizedResponseCheck(response, navigate); return response.json() })
            .then(data => {
                setShopStocks(data);
                setDefaultStock(data[0]);
                setSelectedStock(data[0].id);
                setDefaultReceipt('Bosanski');
            });
    }

    useEffect(() => {
        getStocks();
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleStockChange = (e) => {
        console.log("Stock change ", e.target.options[0].getAttribute("data-id"));
        //setSelectedStock(e.target.value.getAttribute("data-id"));
        setSelectedStock(e.target.value);
        //console.log(e.target.value.id)
        console.log('ID:')
        console.log(e.target.value)
        
    }

    const handleReceiptChange = (e) => {

        setSelectedReceipt(e.target.value);

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
        <form className="unos">
            <div className="col">
                <h1>Create new shop</h1>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <input
                            id="ime"
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => { handleNameChange(e) }}
                        />
                    </div>
                </div>
                <div className="col">
                    <input
                        id="adresa"
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => { handleAddressChange(e) }}
                    />
                </div>
                {shopStocks === null || shopStocks.length === 0 || defaultStock === null ?
                    <h6 style={{ marginTop: "10px", marginBottom: "20px" }}>There are no stocks available!</h6>
                    :
                    <div className="dropdown" style={{ marginTop: "10px", marginBottom: "20px" }}>
                        <select className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                            onChange={(e) => handleStockChange(e)}>
                            {
                                shopStocks.map(stock => {
                                    return <option className="dropdown-item" href="#" key={stock.id} value={stock.id} data-id={stock.id}>{stock.name}</option>;
                                })
                            }
                        </select>
                    </div>
                    }

                    {receiptTypes === null || receiptTypes.length === 0  ?
                        <h6 style={{ marginTop: "10px", marginBottom: "20px" }}>There is no receipt types available!</h6>
                        :
                        <div>Choose the type of receipt you want to generate
                        <div className="dropdown" style={{ marginTop: "10px", marginBottom: "20px" }}>
                            <select className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                onChange={(e) => handleReceiptChange(e)}>
                                {
                                    receiptTypes.map(receipt => {
                                        return <option className="dropdown-item" href="#" value={receipt} data-id={receipt}>{receipt}</option>;
                                    })
                                }
                            </select>
                            </div>
                        </div>
                    }


                <button
                    type="button"
                    onClick={addShop}
                >
                    Add
                </button>
            </div>

        </form>
            </Box>
    );
};

export default AddShopComponent;