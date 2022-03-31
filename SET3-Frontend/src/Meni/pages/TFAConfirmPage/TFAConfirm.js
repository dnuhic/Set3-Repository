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

    /*const validEmail = () => {
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
    }*/


    useEffect(async () => {

        console.log(EmailProvided);
        if (EmailProvided != null) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(EmailProvided)
            };
            try {
                await fetch('https://localhost:7194/api/mail/send', requestOptions).then(res => {
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
                    <h1>Two Factor Authentication</h1>
                    <div class="form-box">
                        <input type="text" placeholder="Input code" required />
                    </div>
                    <div className="form-submit">
                        <button>Confirm</button>
                    </div>




                </div>
            </div>
        );

};

export default ForgotPassword;
