
import './UpdateUserComponent.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom'

const UpdateUserComponent = (props) => {
    const [user, setUser] = useState(null);
    const [updatedUser, setUpdatetUser] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [edit, setEdit] = useState(false);
    const { id } = useParams();

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

        const response = await fetch('https://localhost:7194/usermodels/1', requestOptions);
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

   
    return (
        <>
            {!user && <div>Loading...</div>}
            {user && <div className="App">
                <div className="main-box">

                    <div className="container" >
                        <div className="updateUser-box">
                            <input id="firstName" type="text" value={firstName} disabled={!edit} onChange={handleFirstNameChange}></input>
                            <input id="lastName" type="text" value={lastName} disabled={!edit} onChange={handleLastNameChange}></input>
                            <input id="email" type="text" value={email} disabled={!edit} onChange={handleEmailChange}></input>
                            <Stack direction="column" spacing={2} height="30%" width="40%" margin="2%" >
                                {!edit && <Button className="editButton" variant="outlined" onClick={handleEditButtonClikc} >Edit</Button>}
                                {edit && <div>
                                    <Button className="submitButton" variant="outlined" onClick={handleSaveButtonClikc}>Submit</Button>
                                    <Button className="cancelButton" variant="outlined" onClick={handleCancelButtonClikc} >Cancel</Button>

                                </div>}

                                

                            </Stack>
                        </div>

                        <div className="edit-role">
                            <p>edit role </p>

                        </div>
                    </div>

                    <div className="updatePassword-box">
                        <p>Ovdje će ići promjena passworda.</p>
                    </div>
                </div>

            </div>}


        </>
    );
}

export default UpdateUserComponent;
