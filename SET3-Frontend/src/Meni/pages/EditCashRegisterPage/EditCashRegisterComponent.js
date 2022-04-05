import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";
import '../styleForm.css';

const EditCashRegister = () => {
    const editCashRegister = () => {
    }
    const handleShopIdChange = (event) => {

    };
    const handleCashRegisterNameChange = (event) => {
        
    };

    const handleCashRegisterDescriptionChange = (event) => {
        
    };

    return (
        <>
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

    );
}

export default EditCashRegister;