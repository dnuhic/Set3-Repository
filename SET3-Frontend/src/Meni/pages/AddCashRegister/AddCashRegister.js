import React, { useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";
//import '../styleForm.css';

export default function AddCashRegister(props) {
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
        const dataShop = await responseShop.json();

        setShops(dataShop);
        setStore(dataShop[0].id)

    }, []);


    

    function handleSubmit() {
        console.log("Submitting ")
        if (shops != null && store != null) {
            const newRegister = {
                "Name": document.getElementById("nazivKase").value,
                "Description": document.getElementById("opis").value,
                "ShopId": store,
                "Deleted": false
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
                .then(response => { response.json(); console.log(response); })
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
        <>
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
                            <select class="form-control" onChange={handleChange}>
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
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>

                </form>
            }
            {
                !shops && <h1>Loading...</h1>
            }
        </>
        );
}