import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";

const AddShopComponent = () => {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [shopStocks, setShopStocks] = useState(null);

    const [defaultStock, setDefaultStock] = useState(null);

    const [selectedStock, setSelectedStock] = useState(null);

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
            console.log("Tijelo je: ", body);
            const requestOptions = {
                method: 'POST',
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify(body)
            };
            fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels`, requestOptions)
                .then(response => {
                    if (response.ok)
                        return response.json()
                    else
                        throw new Error("There was an error!");
                })
                .then(data => {
                    alert("Shop was succesfully added!");
                    setName("");
                    setAddress("");
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
            .then(response => response.json())
            .then(data => {
                setShopStocks(data);
                setDefaultStock(data[0]);
                setSelectedStock(data[0].id);
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

    return (
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

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addShop}
                >
                    Add
                </button>
            </div>

        </form>

    );
};

export default AddShopComponent;