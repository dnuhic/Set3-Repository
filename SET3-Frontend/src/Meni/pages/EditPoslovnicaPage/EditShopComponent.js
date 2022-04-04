import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";
import '../styleForm.css';

const EditShopComponent = () => {
    // Dobavljanje poslovnice iz baze i postavljanje inicijalnih vrijednosti
    // podaci iz baze:
    const [shop, setShop] = useState(null);
    const [stocks, setStocks] = useState([]);
    const [defaultStock, setDefaultStock] = useState(null);
    //kase?? - dodati kase?


    //podaci iz url??
    const { id } = useParams();

    const [Name, setName] = useState("");
    const [Adress, setAddress] = useState("");
   

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
        const responseShop = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/ShopModels/${id}`, requestOptions);
        const dataShop = await responseShop.json();

        const responseStock = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/StockModels`, requestOptions);
        const dataStock = await responseStock.json();

        setShop(dataShop);
        setName(dataShop.Name);
        setAddress(dataShop.Adress);
        setStocks(dataStock);
        let temp = dataStock.map(stock => stock.Id == dataShop.StockId)
        setDefaultStock(temp)
        console.log(dataShop);
    };

    useEffect(getData, []);

    // EDIT POSLOVNICA
    const editShop = () => {
        console.log("POSLOVNICA: " + shop);
        console.log(shop);
        let newStockId = dataStock.map(stock => stock.Name == document.getElementById("stockNames").value);
        const newShop = {
            Id: shop.id,
            Name: document.getElementById("name").value,
            Adress: document.getElementById("address").value,
            StockId: newStockId,
            Deleted: shop.deleted,
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


    useEffect(async () => {
        if (shop != null && updatedShop != null) {
            console.log(updatedShop);
            const requestOptions = {
                method: "POST",
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
                body: JSON.stringify(updatedShop),
                credentials: 'same-origin'
            };
            //fix api
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/ShopModels/${shop.id}`, requestOptions);


            console.log("OVO ERROR BACA ");
            console.log(response);


            alert("Changes have been saved succesfully!")
        }

    }, [updatedShop]);

    return (
        <>
            {shop && <>
                <form className="unos">
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
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ${defaultStock}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {
                                stocks.forEach(stock => {
                                    <a class="dropdown-item" href="#">${stock}</a>
                            })

                            }
                           
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
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
        </>
    );

};

export default EditShopComponent;