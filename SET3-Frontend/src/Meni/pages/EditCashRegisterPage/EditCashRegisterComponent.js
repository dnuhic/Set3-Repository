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
        console.log("Data je");
        console.log(data);
    }

    useEffect(getData, []);

    const editCashRegister = () => {
        console.log("CASHREGISTER: " + cashRegister);
        console.log(cashRegister);
        const newCashRegister = {
            Id: cashRegister.id,
            ShopId: document.getElementById("shopId").value,
            Deleted: cashRegister.deleted,
            Name: document.getElementById("cashRegisterName").value,
            Description: document.getElementById("cashRegisterDescription").value
        };

        console.log("NEW CashRegister: ");
        console.log(newCashRegister);

        setUpdatedCashRegister(newCashRegister);
    }
    const handleShopIdChange = (event) => {
        setShopId(event.target.value);
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
                method: "POST",
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
                body: JSON.stringify(updatedCashRegister),
                credentials: 'same-origin'
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}CashRegisterModels/${cashRegister.id}`, requestOptions);

            console.log("OVO ERROR BACA ");
            console.log(response);

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
                        <select name="shopId" id="shopId" value={shopId} onChange={handleShopIdChange}>
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