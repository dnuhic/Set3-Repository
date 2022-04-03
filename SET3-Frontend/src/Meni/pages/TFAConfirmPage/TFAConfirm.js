import { emphasize } from '@mui/material';
import React, {
    Component, useState, useEffect, useCallback
} from 'react';
import '../styleForm.css';
import { useNavigate, useParams } from 'react-router-dom';



const ForgotPassword = (props) => {

    const { id } = useParams();

    const [UserCode, setUserCode] = useState("");
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    const validCode = () => {
        let x = validate();
        console.log(x);

        if (x) {

            alert("Verification successful. TFA activated!");

            const user = { "Email": props.email,"Password": props.password };
            console.log("Uspjesno pozvano");
            console.log(JSON.stringify(user));

            fetch('https://localhost:7194/Authentication', {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true },
                credentials: 'include',
                body: JSON.stringify(user)
            }).then(response => {

                if (response.status >= 200 && response.status < 300) {
                    console.log("Sve OK: " + response.status);
                    navigate('/');
                    window.location.reload(false);
                } else {
                    throw new Error("Greska");
                }
            });


        } else alert("Wrong code!");

    }

    useEffect(async () => {
        /*
        const getEmail = async () => {
            const emailFromServer = await fetchEmail()
            setEmail(emailFromServer);
        }
        getEmail();
        */
        let email = {
            "ToEmail": props.email
        };
        console.log("Email je: ")
        console.log(email);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(email)
        };

        var res = await fetch('https://localhost:7194/api/mail/sendcode', requestOptions);
        var data = await res.json();

        alert("Check your e-mail then verify the code.");
        console.log(data);
        setUserCode(data.result);

    }, [])
    /*
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
    }*/
    /*
    const fetchEmail = async () => {
        const res = await fetch('https://localhost:7194/usermodels/' + id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json", "Access-Control-Allow-Credentials": true,
                "Authorization": "bearer " + getCookie("jwt")
            },
            credentials: 'include'
        })
        const data = await res.json();
        setEmail(data.email);
        return data;
    }*/


    const validate = () => {
        var usercode = document.getElementById("codeinput").value;
        /*
        const getCode = async () => {
            const codeFromServer = await fetchCode()
            setUserCode(codeFromServer);
        }
        getCode();*/

        console.log("Korisnik unio: " + usercode);
        console.log("Korisnikov tfa: ");
        console.log(UserCode);

        return usercode === UserCode;
    }

    return (
        <div className="form-container">
            <div name="myForm" className="form-wrap" >
                <h1>Input 6-digit code: </h1>
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
