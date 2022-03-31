import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSumbit = (e) => { 
        e.preventDefault();

        const user = { Email, Password };
        console.log("Uspjesno pozvano");
        console.log(JSON.stringify(user));

        fetch('https://set3-backend20220330235604.azurewebsites.net//Authentication', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true },
            credentials: 'include',
            body: JSON.stringify(user)
        }).then(response => {

            if (response.status >= 200 && response.status<300) {
                console.log("Sve OK: "+ response.status );
                navigate('/');
                window.location.reload(false);
            } else {
                throw new Error("Greska");
            }
            })
            .catch(error => {
                setError(true);
                console.log(error);
            });
           

    }


    return (
        <div className="container-forma">
            {error && <div className="greska">Pogresan unos. Ponovite!</div>}
            <h1>Login</h1>
            <form className="forma" onSubmit={handleSumbit}>

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
        </div>
    );
}

export default Login;