import React, { useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";
//import '../styleForm.css';

export default function AddCashRegister(props) {
    const [registerName, setRegisterName] = useState('');

    const [shops, setShops] = useState([])

    function handleNazivChange(event) {
        setRegisterName(event.target.value)
    }

    function handleSubmit() {
        console.log("Submitting ")
    }

    return (
        <>
            <form className="cashRegister">
                <div className="col">
                    <h1>Add Cash Register</h1>
                </div>
                <div className="row">
                    <div className="col my-auto">
                        <h6>Shop: </h6>
                    </div>
                    <div className="col">
                        <select class="form-control">
                            <option disabled selected>Choose shop...</option>
                            {shops.map(e => <option>e</option>)}
                        </select>
                    </div>
                </div>
                <div className="row">
                </div>
                <div className="row">
                    <div className="col my-auto">
                        <h6>Cash register name:</h6>
                    </div>
                    <div className="col">
                        <input value={registerName}
                            id="nazivKase"
                            type="text"
                            className="form-control"
                            placeholder="Cash register name"
                            onChange={handleNazivChange}
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
        </>
        );
}