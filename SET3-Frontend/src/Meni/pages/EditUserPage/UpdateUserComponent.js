
import './UpdateUserComponent.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'




const UpdateUserComponent = (props) => {
    const [user, setUser] = useState(null);
    const [anUser, setanUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setemail] = useState("");
    const [edit, setEdit] = useState(false);
    const [fetch, setFetch] = useState(false);
    const { id } = useParams();

    const getData = async () => {
        
        const response = await fetch('https://localhost:7194/usermodels/' + id);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setUser(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setemail(data.email);
    }

    useEffect(getData, [])

    const handleEditButtonClikc = () => {
        setEdit(true);
    }

    const handleSaveButtonClikc = async () => {
        const newUser = {
            id: user.id,
            email: user.email,
            firstName: firstName,
            lastName: user.lastName,
            password: user.password,
            question: user.question,
            questionId: user.questionId,
            answer: user.answer,
            deleted: user.deleted
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        };

        const response = await fetch('https://localhost:7194/usermodels/' + user.id, requestOptions);
        const data = await response.json();

        setanUser(data);


    }

    useEffect(async () => {

        setUser(anUser);
    }, [anUser])


    const handleCancelButtonClikc = () => {
        setEdit(false);
    }

    const state = {
        disabled: true,
        hidden: true
    }
    const handleSetFirstName = (event) => {
        setFirstName(event.target.value);

    }
    const handleSetLastName = (event) => {
        setLastName(event.target.value);
    }
    const handleSetemail = (event) => {
        setemail(event.target.value);
    }
   
    return (
        <>
            {!user && <div>Loading...</div>}
            {user && <div className="App">
                <div className="main-box">

                    <div className="container" >
                        <div className="updateUser-box">
                            <input type="text" value={firstName} disabled={!edit} onChange={handleSetFirstName}></input>
                            <input type="text" value={lastName} disabled={!edit} onChange={ handleSetLastName}></input>
                            <input type="text" value={email} disabled={!edit} onChange={ handleSetemail}></input>
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
