import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const TFA = () => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSumbit = (e) => {
        e.preventDefault();
        alert("Check your email");
        navigate('/twoFactorAuthenticationConfirm/:id');
    }

    return (
        <div className="container-forma">
            <h1>TFA Verify</h1>
            <form className="forma" onSubmit={handleSumbit}>

                <button className="button-block">TFA</button>
            </form>
        </div>
    );
}

export default TFA;