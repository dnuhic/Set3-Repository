import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styleForm.css';
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';



export default function ForgotPasswordConfirm () {

    const navigate = useNavigate()
    const { id } = useParams();
    const [newPassword, setNewPassword] = useState(null);

    useEffect(() => {
        console.log("emailhash");
        console.log(id);
        console.log("pwd");
        console.log(newPassword);
        if (newPassword != null) {
            async function resetPass() {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "id": id, "Password": newPassword })
                };

                await fetch(`${process.env.REACT_APP_BACKEND_URL}api/mail/reset`, requestOptions).then(res => {
                    ResponseCheckModule.unauthorizedResponseCheck(res, navigate)
                    return res.json
                }).then(json => console.log.json);
                alert("You changed your password successfully");
                
            }
            resetPass();
        }
    }, [newPassword])

    const handleOnClick = () => {
        if (validate()) {
            setNewPassword(document.getElementById("pwd1").value);
        }else{
            //Ovdje warning
            alert("Passwords are not matching");
        }
    }

    const validate = () => {
        var pwd1 = document.getElementById("pwd1").value;
        var pwd2 = document.getElementById("pwd2").value;

        return pwd1 === pwd2;
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
            <div className="form-container">
                <div name="myForm" className="form-wrap" >
                    <h1>Forgot Password</h1>

                    <div id="hideShow">
                        <div className="form-box">
                            <input id="pwd1" type="password" placeholder="New Password" required />
                        </div>
                        <div className="form-box">
                            <input id="pwd2" type="password" placeholder="Confirm New Password" required />
                        </div>

                        <div className="form-submit">
                            <button onClick={handleOnClick} >Change Password</button>
                        </div>

                    </div>


                </div>
            </div>
            </Box>
        );

}
