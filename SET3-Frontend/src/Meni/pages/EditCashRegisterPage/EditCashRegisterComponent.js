import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";
import '../styleForm.css';
import { Update } from '@mui/icons-material';

const EditCashRegister = () => {

    const [cashRegister, setCashRegister] = useState(null);

    const { id } = useParams();

    const [shopId, setShopId] = useState("");
    const [cashRegisterName, setCashRegisterName] = useState("");
    const [cashRegisterDescription, setCashRegisterDescription] = useState("");

    const [updatedCashRegister, setUpdatedCashRegister] = useState(null);

    const [defaultShop, setDefaultShop] = useState(null)
    const [shops, setShops] = useState([])
    const [allShops, setAllShops] = useState([])

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    const getData = async () => {
        console.log("ID JE ");
        console.log(id);
        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}CashRegisterModels/${id}`, requestOptions);
        const data = await response.json();

        setCashRegister(data);
        setCashRegisterName(data.name);
        setCashRegisterDescription(data.description);

        const requestOptionsShop = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };
        const responseShop = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels`, requestOptionsShop);
        const dataShop = await responseShop.json();


        let currentShop = dataShop.filter(shop => shop.id == id).map(shop => shop.name)
        console.log(currentShop)
        setDefaultShop(currentShop)

        let allOtherShops = dataShop.filter(shop => shop.id != id).map(shop => shop.name)
        setShops(allOtherShops)

        setAllShops(dataShop)
    }

    useEffect(getData, []);

    const editCashRegister = () => {
        let list = document.getElementById("dropdownMenuButton")
        let name = document.getElementById("dropdownMenuButton")[list.selectedIndex].text
        let newShopId = allShops.filter(shop => shop.name == name)[0];
        const newCashRegister = {
            id: cashRegister.id,
            shopId: newShopId.id,
            deleted: cashRegister.deleted,
            name: document.getElementById("cashRegisterName").value,
            description: document.getElementById("cashRegisterDescription").value
        };

        setUpdatedCashRegister(newCashRegister);
    }
    const handleShopIdChange = (event) => {
        setShopId(event.target.value);
        console.log(event.target.value)
    };
    const handleCashRegisterNameChange = (event) => {
        setCashRegisterName(event.target.value);
    };

    const handleCashRegisterDescriptionChange = (event) => {
        setCashRegisterDescription(event.target.value);
    };

    useEffect(async () => {
        if (cashRegister != null && updatedCashRegister != null) {
            console.log(updatedCashRegister);
            const requestOptions = {
                method: "PUT",
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
                body: JSON.stringify(updatedCashRegister),
                credentials: 'same-origin'
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}CashRegisterModels/${cashRegister.id}`, requestOptions);


            alert("Changes have been saved succesfully!")
        }

    }, [updatedCashRegister]);

    return (
        <>
            {cashRegister && <>
                <form className="unos">
                    <div className="col">
                        <h1>Edit cash register</h1>
                    </div>
                    <div className="row">
                        <select type="button" id="dropdownMenuButton" onChange={handleShopIdChange}>
                            <option>{defaultShop}</option>
                            {
                                shops.map(shop => {
                                    return <option>{shop}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="row">

                        <div className="col">
                            <input value={cashRegisterName}
                                id="cashRegisterName"
                                type="text"
                                className="form-control"
                                placeholder="Cash register name"
                                onChange={handleCashRegisterNameChange}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <textarea value={cashRegisterDescription}
                            id="cashRegisterDescription"
                            type="text"
                            rows="5"
                            cols="45"
                            className="form-control"
                            placeholder="Cash register description"
                            onChange={handleCashRegisterDescriptionChange}></textarea>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={editCashRegister}
                    >
                        Edit
                    </button>
                </form>
            </>
            }

            {
                !(cashRegister) && <h1>Loading...</h1>
            }
        </>

    );
}

export default EditCashRegister;