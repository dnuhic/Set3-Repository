import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";
import '../styleForm.css';
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';

const Settings = () => {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState(null);

    const navigate = useNavigate()
    //podaci iz url??
    const { id } = useParams();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    //TO DO
    const [role, setRole] = useState(null);

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
        const responseUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}usermodels/${id}`, requestOptions);
        ResponseCheckModule.unauthorizedResponseCheck(responseUser, navigate)
        const dataUser = await responseUser.json();

        const responseRole = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/RoleModels`)
        ResponseCheckModule.unauthorizedResponseCheck(responseRole, navigate)
        const dataRoles = await responseRole.json();

        setUser(dataUser);
        setFirstName(dataUser.firstName);
        setLastName(dataUser.lastName);
        setEmail(dataUser.email);
        setRole(dataUser.roleName);
        setRoles(dataRoles);
        console.log(dataUser);
    };

    useEffect(getData, []);



    // EDIT USER
    const editUser = () => {
        console.log("USER: " + user);
        console.log(user);
        const newUser = {
            Id: user.id,
            Email: user.email,
            FirstName: document.getElementById("firstName").value,
            LastName: document.getElementById("lastName").value,
            Password: user.password,
            RoleName: role,
            QuestionId: user.questionId,
            Answer: user.answer,
            Deleted: user.deleted,
            TFA: user.tfa //provjeriti
        };

        console.log("NEW USER: ");
        console.log(newUser);

        setUpdatetUser(newUser);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };


    useEffect(async () => {
        if (user != null && updatedUser != null) {
            console.log(updatedUser);
            const requestOptions = {
                method: "POST",
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
                credentials: 'same-origin'
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}usermodels/${user.id}`, requestOptions);
            ResponseCheckModule.unauthorizedResponseCheck(response, navigate)


            console.log("OVO ERROR BACA ");
            console.log(response);


            alert("Changes have been saved succesfully!")
        }

    }, [updatedUser]);

    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }

    return (
        <Box sx={{
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
            {user && roles && role && <>
                <form className="unos">
                    <div className="col">
                        <h1>Settings</h1>
                    </div>
                    <div className="row">

                        <div className="col">
                            <input value={firstName}
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                onChange={handleFirstNameChange}
                            />
                        </div>
                        <div className="col">
                            <input value={lastName}
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                onChange={handleLastNameChange}
                            />
                        </div>
                    </div>
                    <div className="row">

                    </div>
                    <div className="row">
                        <div className="col">

                            <div class="form-click">
                                <div class="form-box">
                                    <select name="pitanja" id="pitanja" value={role} onChange={handleRoleChange}>
                                        {roles && roles.length &&
                                            roles.map(q => <option value={q.roleName}>{q.roleName}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>User e-mail can't be changed</p>
                            <input value={email}
                                id="email"
                                type="email"
                                className="form-control"
                                disabled={true}
                            />

                        </div>
                    </div>


                    <button
                        type="button"
                        onClick={editUser}
                    >
                        Edit
                    </button>
                </form>
               
            </>
            }
            {
                !(user && roles && role) && <h1>Loading...</h1>
            }
        </Box>
    );

    function hasNumber(myString) {
        return /\d/.test(myString);
    }
};

export default Settings;