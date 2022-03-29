import { emphasize } from '@mui/material';
import React, {
    Component, useState, useEffect, useCallback
} from 'react';
import '../styleForm.css';


const ForgotPassword = () => {

    const [EmailProvided, setEmailProvided] = useState(null);
    const ProvideEmail = () => {
        let email = {
            "ToEmail": document.getElementById("email").value
        }

        setEmailProvided(email);
    }


    useEffect(async () => {

        console.log(EmailProvided);
        if (EmailProvided != null) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(EmailProvided)
            };

            await fetch('https://localhost:7194/api/mail/send', requestOptions);
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
                        <button onClick={ProvideEmail}>Send</button>

                    </div>




                </div>
            </div>
        );

};

export default ForgotPassword;
