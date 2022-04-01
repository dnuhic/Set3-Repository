import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";

const EditUserComponent = () => {
    // Dobavljanje korisnika iz baze i postavljanje inicijalnih vrijednosti:

    // podaci iz baze:
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState(null);


    //podaci iz url??
    const { id } = useParams();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    //TO DO
    const [role, setRole] = useState(""); 

    const [updatedUser, setUpdatetUser] = useState(null);

    const [newPassword, setNewPassword] = useState(null);

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
        const data = await responseUser.json();

        //const responseRoles = await fetch("https://localhost:7194/usermodels/")

        setUser(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
    };

    useEffect(getData, []);

    //CHANGE PASSWORD

    const changePassword = () => {
        if (document.getElementById('password').value.trim() == document.getElementById('rpassword').value.trim()) {
            if (document.getElementById('password').value.length >= 8) {
                console.log(' OVO ZBOG TESTIRANJA Nova sifra glasi ' + document.getElementById('password').value.trim())
                setNewPassword(document.getElementById('password').value);
                alert("You have successfully changed your password");
            }
            else {
                alert("Password must contain 8 symbols!")
            }
        }
        else {
            alert("Passwords are not matching");
        }
    }

    useEffect(() => {
        if (newPassword != null) {
            async function resetPass() {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "Id": Number(id), "NewPassword": newPassword })
                };
                const pom = { "Id": Number(id), "NewPassword": newPassword };
                console.log("ID I NOVA SIFRA");
                console.log(pom);

                await fetch('https://localhost:7194/UserModels/changePassword', requestOptions).then(res => res.json).then(json => console.log.json);
            }
            resetPass();
        }
    }, [newPassword])


    // EDIT USER
    const editUser = () => {
        console.log("USER: " + user);
        console.log(user);
        const newUser = {
            Id: user.id,
            Email: document.getElementById("email").value,
            FirstName: document.getElementById("firstName").value,
            LastName: document.getElementById("lastName").value,
            Password: user.password,
            RoleName: user.roleName,
            QuestionId: user.questionId,
            Answer: user.answer,
            Deleted: user.deleted,
        };

        setUpdatetUser(newUser);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    useEffect(async () => {
        console.log(updatedUser);
        const requestOptions = {
            method: "POST",
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
            credentials: 'same-origin'
        };

        const response = await fetch("https://localhost:7194/usermodels/" + user.id, requestOptions);
        const data = await response.json();
        alert("Changes have been saved succesfully!")
        console.log(data);
    }, [updatedUser]);


    return (
        <>
            <form className="unos">
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <input value={firstName}
                                id="firstName"
                                type="text"
                                className="form-control"
                                onChange={handleFirstNameChange}

                            />
                        </div>
                    </div>
                    <div className="col">
                        <input value={lastName}
                            id="lastName"
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            onChange={handleLastNameChange}
                        />
                    </div>
                </div>
                <input value={email}
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                    onChange={handleEmailChange}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={editUser}
                >
                    Edit
                </button>
            </form>
            <form className="unos">

                <div className="mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password"></input>
                </div>

                <div className="mb-3">
                    <input type="password" className="form-control" id="rpassword" placeholder="Repeat password"></input>
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={changePassword}
                >
                    Change password
                </button>

            </form>
         </>
    );

    function hasNumber(myString) {
        return /\d/.test(myString);
    }
};

export default EditUserComponent;