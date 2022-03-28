
import './UpdateUserComponent.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'




const UpdateUserComponent = (props) => {
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(false);
    const { id } = useParams();

    const getData = async () => {
        
        const response = await fetch('https://localhost:7194/usermodels/' + id);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setUser(data);
    }

    useEffect(getData, [])

    const handleEditButtonClikc = () => {
        setEdit(true);
    }

    const handleSaveButtonClikc = () => {
        setEdit(false);
    }

    const handleCancelButtonClikc = () => {
        setEdit(false);
    }

    const state = {
        disabled: true,
        hidden: true
    }


    return (
        <>
            {!user && <div>Loading...</div>}
            {user && <div className="App">
                <div className="main-box">

                    <div className="container" >
                        <div className="updateUser-box">
                            <input type="text" value={user.firstName} disabled={state.disabled}></input>
                            <input type="text" value={user.lastName} disabled={state.disabled}></input>
                            <input type="text" value={user.email} disabled={state.disabled}></input>
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
