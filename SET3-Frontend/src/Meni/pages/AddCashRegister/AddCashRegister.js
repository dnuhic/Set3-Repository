import React, { useState, useEffect, useCallback } from 'react';
import '../styleForm.css';
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';

export default function AddCashRegister(props) {
    const navigate = useNavigate()
    const [shops, setShops] = useState(null);
    const [createRegister, setCreateRegister] = useState(null);
    const [store, setStore] = useState(null);

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    useEffect(async () => {

        const requestOptionsShop = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };
        const responseShop = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels`, requestOptionsShop);
        ResponseCheckModule.unauthorizedResponseCheck(responseShop, navigate)
        const dataShop = await responseShop.json();
        var filterDataShop = dataShop.filter(s=>!s.deleted)
        setShops(filterDataShop);
        setStore(filterDataShop[0].id)

    }, []);


    

    function handleSubmit() {
        console.log("Submitting ")
        if (shops != null && store != null) {
            const newRegister = {
                "Name": document.getElementById("nazivKase").value,
                "Description": document.getElementById("opis").value,
                "ShopId": store,
                "Deleted": false,
                "Installed": false
            }

            setCreateRegister(newRegister);
        }
    }

    useEffect(() => {
        if (createRegister != null) {
            console.log(createRegister);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
                credentials: 'same-origin',
                body: JSON.stringify(createRegister)
            };

            fetch(`${process.env.REACT_APP_BACKEND_URL}api/CashRegisterModels`, requestOptions)
                .then(response => { ResponseCheckModule.unauthorizedResponseCheck(response, navigate); response.json(); console.log(response); })
                .then(data => {
                    console.log(data)
                    document.getElementById("nazivKase").value = "";
                    document.getElementById("opis").value = "";
                    alert("Action completed!");
                });
        }

    }, [createRegister])

    const handleChange = (e) => {
        setStore(e.target.value)
    }

    return (
        <Box sx = {{
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
            {
                shops && <form className="unos">
                    <div className="col">
                        <h1>Create cash register</h1>
                    </div>
                    <div className="row">
                        <div className="col my-auto">
                            <h6>Shop: </h6>
                        </div>
                        <div className="col">
                            <select id="role" onChange={handleChange}>
                                {shops.map(e => <option value={e.id}>{e.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input 
                                id="nazivKase"
                                type="text"
                                className="form-control"
                                placeholder="Name"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input 
                                id="opis"
                                type="text"
                                className="form-control"
                                placeholder="Description"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>

                </form>
            }
            {
                !shops && <h1>Loading...</h1>
            }
        </Box>
        );
}