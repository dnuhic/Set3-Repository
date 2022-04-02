import { emphasize } from '@mui/material';
import React, {
    Component, useState, useEffect, useCallback
} from 'react';
import '../styleForm.css';
import { useNavigate, useParams } from 'react-router-dom';


const ForgotPassword = () => {

    const { id } = useParams();
    const [UserCode, setUserCode] = useState("");
    const navigate = useNavigate();

    const validCode = () => {

        if (validate()) {
            alert("Verification successful. TFA activated!");
            navigate('/');
        } else alert("Wrong code!");

    }

    useEffect(async () => {

        let email = {
            "ToEmail": "adizdarevi1@etf.unsa.ba"
        };
        console.log(email);
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(email)
        };
        await fetch('https://localhost:7194/api/mail/sendcode', requestOptions).then(res => {
            if (res.ok) console.log("UREDU JE");
            else console.log("Ne javlja se");
            if (res.status == 400)
                alert("User has no e-mail!");
            else {
                alert("Check your e-mail then verify the code.");
            }
        }).catch((Error) => console.log(Error));
    }, [])

    const fetchCode = async () => {
        const res = await fetch('https://localhost:7194/usermodels/' + id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json", "Access-Control-Allow-Credentials": true,
                "Authorization": "bearer " + getCookie("jwt")
            },
            credentials: 'include'
        })
        const data = await res.json();
        setUserCode(data.TFA);
        return data;
    }

    const validate = async () => {
        var usercode = document.getElementById("codeinput").value;

        const getCode = async () => {
            const codeFromServer = await fetchCode()
            setUserCode(codeFromServer);
        }
        getCode();

        return usercode === UserCode;
    }

    return (
        <div className="form-container">
            <div name="myForm" className="form-wrap" >
                <h1>Two Factor Authentication</h1>
                <div className="form-box">
                    <input id="codeinput" type="text" placeholder="Input code" required />
                </div>
                <div className="form-submit">
                    <button onClick={validCode}>Confirm</button>
                </div>




            </div>
        </div>
    );

};

export default ForgotPassword;
