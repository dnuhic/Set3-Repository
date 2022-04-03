import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import '../styleForm.css';

const TFA = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSumbit = async () => {
        
        console.log("PROSLO");

        navigate('/twoFactorAuthenticationConfirm/' + id);
    }
   
    return (
        <div className="form-container">
            <div name="myForm" className="form-wrap" >
                <h1>Enable Two Factor Authentication</h1>
                <div className="form-submit">
                    <button onClick={handleSumbit}>Enable</button>
                </div>
            </div>
        </div>
    );
}

export default TFA;