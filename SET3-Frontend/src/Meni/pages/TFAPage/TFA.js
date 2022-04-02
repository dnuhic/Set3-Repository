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

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    useEffect(async () => {

        const getUser = async () => {
            const userFromServer = await fetchUser()
            setUser(userFromServer);
        }
        getUser();

    },[])

    const fetchUser = async () => {
        const res = await fetch('https://localhost:7194/usermodels/'+id, {
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
    }

    const handleSumbit = async () => {
        
        console.log("PROSLO");

        navigate('/twoFactorAuthenticationConfirm/' + id);
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