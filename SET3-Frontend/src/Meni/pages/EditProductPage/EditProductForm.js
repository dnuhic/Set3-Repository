import React, { Component, useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function EditProductForm() {
    return (
        <>
             <form className="unos">
                <div className="col">
                    <h1>Edit product</h1>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder="Product name"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <input
                            id="address"
                            type="text"
                            className="form-control"
                            placeholder="Address"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">

                        <div className="form-click">
                            <div className="form-box">
                                <select name="role" id="role" >
                                    
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">

                        <div className="form-click">
                            <div className="form-box">
                                <select name="role" id="role" >
                                    
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"   
                >
                    Edit product
                </button>
                
            </form>
           
        </>

    );
}

export default EditProductForm;