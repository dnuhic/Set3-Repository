import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";

const EditUserComponent = () => {
    // Dobavljanje korisnika iz baze i postavljanje inicijalnih vrijednosti:

    // podaci iz baze:
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState(null);
    const forSelection = [];


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
        const dataUser = await responseUser.json();

        const responseRole = await fetch("https://localhost:7194/api/RoleModels")
        const dataRoles = await responseRole.json();

        setUser(dataUser);
        setFirstName(dataUser.firstName);
        setLastName(dataUser.lastName);
        setEmail(dataUser.email);
        setRole(dataUser.role);
        setRoles(dataRoles);
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
            document.getElementById("password").value = "";
            document.getElementById("rpassword").value = "";

        }
    }, [newPassword])


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
            RoleName: user.roleName,
            QuestionId: user.questionId,
            Answer: user.answer,
            Deleted: user.deleted,
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
        console.log(updatedUser);
        const requestOptions = {
            method: "POST",
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
            credentials: 'same-origin'
        };

        const response = await fetch("https://localhost:7194/usermodels/" + user.id, requestOptions);
        

        console.log("OVO ERROR BACA ");
        console.log(response);
        const data = await response.json();

        console.log("OVO JE DATA ");
        console.log(data);

        alert("Changes have been saved succesfully!")
        console.log(data);
    }, [updatedUser]);

    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }

    return (
        <>
            <form className="unos">
                <div className="col">
                        <h1>Edit user</h1>
                    </div>
                <div className="row">
                    <div className="col">
                        <h5>First name: </h5>
                    </div>
                    <div className="col">
                        <input value={firstName}
                                id="firstName"
                                type="text"
                                className="form-control"
                            onChange={handleFirstNameChange}
                        />
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col">
                        <h5>Last name: </h5>
                    </div>
                    <div className="col">
                        <input value={lastName}
                            id="lastName"
                            type="text"
                            className="form-control"
                            onChange={handleLastNameChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h5>Role type: </h5>
                    </div>
                    <div className="col">
                        <select name="role" id="role" value={role} onChange={handleRoleChange}>
                            {roles && roles.length &&
                                roles.map(q => <option value={q.roleName}>{q.roleName}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div id="emailHelp" className="form-text">User e-mail can't be changed</div>
                <input value={email}
                    id="email"
                    type="email"
                    className="form-control"
                    disabled={true}
                />
                
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
                    <h1>Change password</h1>
                </div>
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