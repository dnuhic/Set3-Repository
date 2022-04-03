import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";
import '../styleForm.css';

const EditPoslovnicaComponent = () => {
    // Dobavljanje poslovnice iz baze i postavljanje inicijalnih vrijednosti
    // podaci iz baze:
    const [poslovnica, setPoslovnica] = useState(null);
    //kase?? - dodati kase?


    //podaci iz url??
    const { id } = useParams();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
   

    const [updatedPoslovnica, setUpdatedPoslovnica] = useState(null);

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
        //poslovnicamodels promijeniti za pravi api kad bude urađen
        const responsePoslovnica = await fetch(`${process.env.REACT_APP_BACKEND_URL}poslovnicamodels/${id}`, requestOptions);
        const dataPoslovnica = await responsePoslovnica.json();

        //edit ovisno o nazivima i podacima koje budu u backendu
        setPoslovnica(dataPoslovnica);
        setName(dataPoslovnica.name);
        setAddress(dataPoslovnica.address);
        console.log(dataPoslovnica);
    };

    useEffect(getData, []);

    // EDIT POSLOVNICA
    const editPoslovnica = () => {
        console.log("POSLOVNICA: " + poslovnica);
        console.log(poslovnica);
        const newPoslovnica = {
            Id: poslovnica.id,
            Name: document.getElementById("name").value,
            Address: document.getElementById("address").value,
            Answer: poslovnica.answer,
            Deleted: poslovnica.deleted,
        };
        console.log("NEW POSLOVNICA: ");
        console.log(newPoslovnica);

        setUpdatedPoslovnica(newPoslovnica);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };


    useEffect(async () => {
        if (poslovnica != null && updatedPoslovnica != null) {
            console.log(updatedPoslovnica);
            const requestOptions = {
                method: "POST",
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
                body: JSON.stringify(updatedPoslovnica),
                credentials: 'same-origin'
            };
            //promijeniti poslovnicamodels na osnovu uradjenog backenda
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}poslovnicamodels/${poslovnica.id}`, requestOptions);


            console.log("OVO ERROR BACA ");
            console.log(response);


            alert("Changes have been saved succesfully!")
        }

    }, [updatedPoslovnica]);

    return (
        <>
            {poslovnica && <>
                <form className="unos">
                    <div className="col">
                        <h1>Edit poslovnica</h1>
                    </div>
                    <div className="row">

                        <div className="col">
                            <input value={name}
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="col">
                            <input value={address}
                                id="address"
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                onChange={handleAddressChange}
                            />
                        </div>
                    </div>
                  
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={editPoslovnica}
                    >
                        Edit
                    </button>
                </form>
            </>
            }
            {
                !(poslovnica) && <h1>Loading...</h1>
            }
        </>
    );

};

export default EditPoslovnicaComponent;