import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import '../styleForm.css';
import TFAConfirm from "../TFAConfirmPage/TFAConfirm";
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import Box from '@mui/material/Box';

const TFA = () => {
    const [user, setUser] = useState(null);
    const [clicked, setClicked] = useState(false)
    const navigate = useNavigate()
    const handleSumbit = () => {
        setClicked(true);

    }

    const { id } = useParams();

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    const getData = async () => {
        console.log(id);
        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };
        const responseUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}usermodels/${id}`, requestOptions);
        ResponseCheckModule.unauthorizedResponseCheck(responseUser, navigate)
        const dataUser = await responseUser.json();

        setUser(dataUser);
    };

    useEffect(getData, []);
   
    return (
        <>
            {user && !clicked && <div className="form-container">
            <div name="myForm" className="form-wrap" >
                <h1>Enable Two Factor Authentication</h1>
                <div className="form-submit">
                    <button onClick={handleSumbit}>Enable</button>
                </div>
            </div>
            </div>}
            {user && clicked && <TFAConfirm email={user.email} password={user.password} />}
            {!user && <h1>Loading...</h1>}
        </>
        
        
    );
}

export default TFA;