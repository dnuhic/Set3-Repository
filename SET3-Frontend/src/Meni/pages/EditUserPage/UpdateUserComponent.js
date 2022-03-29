
import './UpdateUserComponent.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';

const UpdateUserComponent = (props) => {
    const [user, setUser] = useState(null);
    const [updatedUser, setUpdatetUser] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    ////
    //const [nameError, setNameError] = useState("Invalid email");
    const [edit, setEdit] = useState(false);
    const { id } = useParams();
    const [editPassword, setEditPassword] = useState(true);

    const getData = async () => {
        console.log(id);
        const response = await fetch('https://localhost:7194/usermodels/' + id);
        console.log(response);
        const data = await response.json();
        console.log(data);

        setUser(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
    }

    useEffect(getData, [])

    const handleEditButtonClikc = () => {
        setEdit(true);
    }

    const handleSaveButtonClikc = () => {
        console.log("USER: " + user);
        console.log(user);
        const newUser = {
            "Id": user.Id,
            "Email": document.getElementById("email").value,
            "FirstName": document.getElementById("firstName").value,
            "LastName": document.getElementById("lastName").value,
            "Password": user.Password,
            "Question": user.Question,
            "QuestionId": user.QuestionId,
            "Answer": user.Answer,
            "Deleted": user.Deleted
        }

        setUpdatetUser(newUser);
        setEdit(false);
    }

    useEffect(async () => {
        console.log(updatedUser);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        };

        const response = await fetch('https://localhost:7194/usermodels/' + user.id, requestOptions);
        const data = await response.json();
        console.log(data);
    }, [updatedUser])


    const handleCancelButtonClikc = () => {
        setEdit(false);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }


    const handleCancelButtonClikc1 = () => {
        setEditPassword(false);
    }
   
    return (
        <>
            {!user && <div>Loading...</div>}
            {user && <div className="App">
                <div className="main-box">

                    <div className="container" >
                        <div className="updateUser-box">
                            <h1 > Edit User</h1>
                            <input id="firstName" type="text" value={firstName} disabled={!edit} onChange={handleFirstNameChange}></input>
                            <input id="lastName" type="text" value={lastName} disabled={!edit} onChange={handleLastNameChange}></input>
                            <input id="email" type="text" value={email} disabled={!edit} onChange={handleEmailChange}></input>
                            
                                {!edit && <button className="editButton"  variant="contained" onClick={handleEditButtonClikc} >Edit</button>}
                                {edit && <div>
                                    <button className="submitButton" variant="contained" onClick={handleSaveButtonClikc}>Submit</button>
                                    <button className="cancelButton" variant="contained" onClick={handleCancelButtonClikc1} >Cancel</button>

                                </div>}

                                

                        </div>

                        <div className="edit-role">
                            <p>edit role </p>

                        </div>
                    </div>

                    <div className="updatePassword-box">
                        <h1 >Change Password</h1>
                        <label> Current Password:
                        <input id="password" type="password" />
                        </label>
                        <label> New Password:
                            <input id="password" type="password" />
                        </label>
                        <label> Re-type New Password:
                            <input id="password" type="password" />
                        </label>



                        {!edit && <div className='buttons' >

                            <button className="SubmitBtn" variant="outlined" onClick={handleSaveButtonClikc}>Submit</button>
                            <button className="cancelButton1" variant="outlined" onClick={handleCancelButtonClikc} >Cancel</button>

                        </div>}


                    </div>
                </div>

            </div>}


        </>
    );
}

export default UpdateUserComponent;
