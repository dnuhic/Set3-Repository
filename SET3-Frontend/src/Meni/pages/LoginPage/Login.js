import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import TFAConfirm from '../TFAConfirmPage/TFAConfirm';
import Box from '@mui/material/Box';

const Login = () => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleSumbit = async (e) => {
        e.preventDefault();

        const user = { Email, Password };
        console.log("Uspjesno pozvano");
        console.log(JSON.stringify(user));
        
        fetch(`${process.env.REACT_APP_BACKEND_URL}Authentication`, {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true },
            credentials: 'include',
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            const token = data.result;
            if (token === "ERROR") {
                throw Error("nema u bazi");
            }
            document.cookie = `jwt=${token};max-age=604800;domain=`
        })
        .then(() => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}Authentication/getUserTFA/${Email}`).then(r => r.json()).then(x => {
                console.log("X");
                console.log(x);
                if (x.result !== "") {
                    setButtonClicked(true);
                   
                } else {
                    navigate('/');
                    window.location.reload(false);
                    setButtonClicked(false);
                }
            })
        }).catch(function (error) {
            console.log(error);
            alert("Wrong log in information");
        });

        /*
        var response = await fetch('https://localhost:7194/Authentication', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true },
            credentials: 'include',
            body: JSON.stringify(user)
        });

        if (response.status >= 200 && response.status < 300) {
            console.log("Sve OK: " + response.status);
            var x = await fetch('https://localhost:7194/Authentication/getUserTFA');
            console.log(x);
            if (x) {
                setButtonClicked(true);
            } else {
                navigate('/');
                window.location.reload(false);
            }
        } else {
            throw new Error("Greska");
        }*/
    }

    useEffect(() => {



    }, [setButtonClicked])

    return (
        <>
            {buttonClicked && <TFAConfirm email={Email} password={Password} />}
            {!buttonClicked && <div className="container-forma">
                {error && <div className="greska">Pogresan unos. Ponovite!</div>}
                
                <form className="forma" onSubmit={handleSumbit}>
                    <h1 className="text-left pl-m m-0" style={{ fontSize: 40, color: 'white' }}> Log In </h1>
                    <label>Email: </label>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        name="Email"
                        variant="outlined"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password: </label>
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        name="Password"
                        variant="outlined"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="button-block">Log in</button>
                    <a className="button-block forgotpwd" href="/forgotpassword">Forgot password?</a>

                </form>
            </div>}

        </>
    );
}

export default Login;