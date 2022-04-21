import { emphasize } from '@mui/material';
import Box from '@mui/material/Box';
import React, {
    Component, useState, useEffect, useCallback
} from 'react';
import '../styleForm.css';
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"



const ForgotPassword = () => {

    const navigate = useNavigate()
    const [EmailProvided, setEmailProvided] = useState(null);

    const ProvideEmail = () => {
        let email = {
            "ToEmail": document.getElementById("email").value
        }

        setEmailProvided(email);
    }

    const validEmail = () => {
        var input = document.getElementById('email');
        var string = document.getElementById('email').value;
        if (string.trim() == '' || input.validity.typeMismatch) {
            alert("Email is not valid. Please enter your Email adress again");
        }
        else {
            let email = {
                "ToEmail": document.getElementById("email").value
            }

            setEmailProvided(email);
        }
    }


    useEffect(async () => {

        console.log(EmailProvided);
        if (EmailProvided != null) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(EmailProvided)
            };
            try {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}api/mail/send`, requestOptions).then(res => {
                    ResponseCheckModule.unauthorizedResponseCheck(res, navigate)
                    if (res.status == 400)
                        alert("Wrong email address provided!");
                    else alert("Check your inbox!");
                });
            } catch (BadRequestException) {
                alert("Your email address is wrong!");
            }
        }
            
    }, [EmailProvided])

    return (
            <div className="form-container">
                <div name="myForm" className="form-wrap" >
                    <h1>Forgot Password</h1>
                    <div className="form-box">
                        <p> Please enter the email you use to sign in.</p>
                        <input id="email" type="email" name="email" placeholder="E-mail Adress" required />
                    </div>
                    <div className="form-submit">
                        <button onClick={validEmail}>Send</button>

                    </div>




                </div>
            </div>
        );

};

export default ForgotPassword;
