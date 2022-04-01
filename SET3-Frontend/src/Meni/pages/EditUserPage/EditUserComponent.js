import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";

const EditUserComponent = () => {
    // Dobavljanje korisnika iz baze i postavljanje inicijalnih vrijednosti:

    // podaci iz baze:
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState(null);


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

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
        const responseUser = await fetch("https://localhost:7194/usermodels/" + id, requestOptions);
        const dataUser = await responseUser.json();

        const responseRoles = await fetch("https://localhost:7194/usermodels/")

        setUser(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setCurrentPassword(data.password);
    };


    return (
        <form className="unos">
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <input
                            id="ime"
                            type="text"
                            className="form-control"

                        />
                    </div>
                </div>
                <div className="col">
                    <input
                        id="prezime"
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                    />
                </div>
            </div>
            <input
                id="e-mail"
                type="email"
                className="form-control"
                placeholder="E-mail"
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>


            <div className="mb-3">
                <input type="password" className="form-control" id="password" placeholder="Password"></input>
            </div>

            <div>Choose a question</div>
            <select name="pitanja" id="pitanja">
                {questions && questions.length &&
                    questions.map(q => <option>{q.question}</option>)
                }
            </select>


            <input
                id="answer"
                type="text"
                className="form-control"
                placeholder="Your answer"
            />

            <button
                type="button"
                className="btn btn-primary"
                onClick={newUser}
            >
                Add
            </button>
        </form>
    );

    function hasNumber(myString) {
        return /\d/.test(myString);
    }
};

export default EditUserComponent;