import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";
import '../styleForm.css';
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';

const EditShopComponent = () => {
    // Dobavljanje poslovnice iz baze i postavljanje inicijalnih vrijednosti
    // podaci iz baze:
    const [shop, setShop] = useState(null);
    const navigate = useNavigate()
    const [stocks, setStocks] = useState([]);
    const [defaultStock, setDefaultStock] = useState({id : 1, name : ""});
    //kase?? - dodati kase?


    //podaci iz url??
    const { id } = useParams();

    const [Name, setName] = useState("");
    const [Adress, setAddress] = useState("");
    const [Deleted, setDeleted] = useState(false);
   

    const [updatedShop, setUpdatedShop] = useState(null);

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }
  
    const getData = async () => {
        console.log(id);
        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };
        //api poziv fix
        const responseShop = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels/${id}`, requestOptions);
        ResponseCheckModule.unauthorizedResponseCheck(responseShop, navigate)
        if (responseShop.status == 404) {
            alert("Shop does not exist.");
        }
        const dataShop = await responseShop.json();
        console.log(dataShop);

        const responseStock = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/StockModels`, requestOptions);
        ResponseCheckModule.unauthorizedResponseCheck(responseStock, navigate)
        const dataStock = await responseStock.json();

        setShop(dataShop);
        setName(dataShop.name);
        setAddress(dataShop.adress);
        setDeleted(dataShop.deleted);
        if (document.getElementById("deleted") != null) {
            if (dataShop.deleted)
                document.getElementById("deleted").checked = true
            else
                document.getElementById("deleted").checked = false
        }
        setStocks(dataStock.filter(stock => stock.id != dataShop.stockId));
        let temp = dataStock.filter(stock => stock.id == dataShop.stockId)[0];
        setDefaultStock(temp)
        console.log(temp)
    };

    useEffect(getData, []);

    // EDIT POSLOVNICA
    const editShop = () => {
        let list = document.getElementById("dropdownMenuButton")
        let stockId = document.getElementById("dropdownMenuButton")[list.selectedIndex].value
        let deleted = true
        if (document.getElementById("deleted") == null)
            deleted = false
        else
            deleted = document.getElementById("deleted").checked
        const newShop = {
            id: shop.id,
            name: document.getElementById("name").value,
            adress: document.getElementById("address").value,
            stockId: stockId,
            deleted: deleted
        };
        console.log("NEW SHOP: ");
        console.log(newShop);
        setUpdatedShop(newShop);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAdressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleDeletedChange = (event) => {
        let checked = document.getElementById("deleted").checked
        console.log(checked)
        if (!checked)
            document.getElementById("deleted").checked = false
        else
            document.getElementById("deleted").checked = true
    };

    const checkDeleted = () => {
        if (Deleted == true)
            return (<label><input class="form-check-input" type="checkbox" value="Deleted" id="deleted" onChange={handleDeletedChange}></input>Deleted</label>);
        return <div></div>
    }


    useEffect(async () => {
        if (shop != null && updatedShop != null) {
            console.log(updatedShop);
            const requestOptions = {
                method: "PUT",
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
                body: JSON.stringify(updatedShop),
                credentials: 'same-origin'
            };
            //fix api
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels/${shop.id}`, requestOptions);
            ResponseCheckModule.unauthorizedResponseCheck(response, navigate)
            alert("Changes have been saved succesfully!")
        }

    }, [updatedShop]);

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
            {shop && <>
                <form className="unos" id="form">
                    <div className="col">
                        <h1>Edit shop</h1>
                    </div>
                    <div className="row">

                        <div className="col">
                            <input value={Name}
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="col">
                            <input value={Adress}
                                id="address"
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                onChange={handleAdressChange}
                            />
                        </div>
                    </div>
                   
                    <div class="dropDownLista">
                        <select  type="button" id="dropdownMenuButton"  aria-haspopup="true" aria-expanded="false">
                            <option value={defaultStock.id}>{
                                defaultStock.name
                            }</option>
                            {
                                stocks.map(stock => {
                                    return <option class="dropdown-item" href="#" value={stock.id}>{stock.name}</option >;
                                })

                            }
                        </select>
                    </div>
                    <div class="form-check">
                        {checkDeleted()}
                    </div>
                    <button
                        type="button"
                        onClick={editShop}
                    >
                        Edit
                    </button>
                </form>
            </>
            }
            {
                !(shop) && <h1>Loading...</h1>
            }
        </Box>
    );

};

export default EditShopComponent;