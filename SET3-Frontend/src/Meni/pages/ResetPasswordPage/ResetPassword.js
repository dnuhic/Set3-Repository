import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styleForm.css';



export default function ResetPassword() {

    const { id } = useParams();
    const [userFetched, setUserFetched] = useState(null);
    const [qFetched, setqFetched] = useState(null);
    const [vidljivo, setVidljivo] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    const getData = async () => {
        //console.log(id);
        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}usermodels/${id}`, requestOptions);
        //console.log(response);
        const data = await response.json();
        //console.log(data);        
        setUserFetched(data);
    }
    useEffect(getData, []);
    useEffect(async () => {
        const question = await fetch(`${process.env.REACT_APP_BACKEND_URL}SecurityQuestionModels/${id}/forgotPassword`);
        const data = await question.json();
        console.log(question);
        console.log(data);
        console.log('Ovo bi trebalo biti null??')
        console.log(data.question);
        //console.log(data.question);
        setqFetched(data.question);
    }, [userFetched]);

    //const getQuestions = async () => {
    //    const pitanjaResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}SecurityQuestionModels`)
    //    const pitanja = await pitanjaResponse.json();

    //    setQuestions(pitanja);
    //}

    //useEffect(getQuestions, []);
    useEffect(async () => {
        const pitanjaResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}SecurityQuestionModels`)
        const pitanja = await pitanjaResponse.json();

        console.log(pitanja);
       
        const nizPitanja = []
        for (const k of pitanja) {
            nizPitanja.push(k.question);
        }
        setQuestions(nizPitanja);
        console.log('ovo se smijesta u setter');
        console.log(nizPitanja);
    }, []);

    useEffect(() => {
        if (newPassword != null) {
            async function resetPass() {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "Id": Number(id), "NewPassword": newPassword })
                };
                const pom = { "Id": Number(id), "NewPassword": newPassword };
                console.log("ID I NOVA SIFRA");
                console.log(pom);

                await fetch(`${process.env.REACT_APP_BACKEND_URL}UserModels/changePassword`, requestOptions).then(res => res.json).then(json => console.log.json);
            }
            resetPass();
        }
    }, [newPassword])



    const handleChange = () => {
        //console.log(document.getElementById('odgovor').value.trim());
        //console.log(userFetched.answer);
        if (document.getElementById('odgovor').value.trim() == userFetched.answer) {
            setVidljivo(true);
            //console.log(state.hidden);
        }
        else {
            setVidljivo(false);
            alert("Answer is not correct!");
        }
    }

    const handleOnClick = () => {
        if (document.getElementById('novaSifra1').value.trim() == document.getElementById('novaSifra2').value.trim()) {
            console.log('Nova sifra glas' + document.getElementById('novaSifra1').value.trim())
            setNewPassword(document.getElementById('novaSifra1').value);
                alert("You have successfully changed your password");
                }
                else {
                    alert("Passwords are not matching");
                }
    }
        
   


    return (
            <>
            {qFetched && <div class="form-container">
                <div action="#" class="form-wrap">
                    <h1>Reset Password</h1>

                    <div class="form-box">
                        {qFetched && <div>{qFetched} </div>}
                        {!qFetched && <p> Loading... </p>}
                        <input type="text" id="odgovor" placeholder="Your Answer" required />
                    </div>
                    <div className="form-submit">
                        <button onClick={handleChange}>Confirm</button>
                    </div>


                    {vidljivo && <div class="form-click">

                        <div class="form-box" >

                            <p>Choose new security question</p>
                            <select name="pitanja" id="pitanja">
                                {questions && questions.length &&
                                    questions.map(q => <option>{q}</option>)

                                }
                            </select>



                            <input placeholder="New Answer" required />
                        </div>
                        <div class="form-box">
                            <p>Choose new password</p>
                            <input type="password" id='novaSifra1' placeholder="New Password" required />
                        </div>
                        <div class="form-box">
                            <input type="password" id='novaSifra2' placeholder="Confirm New Password" required />
                        </div>

                        <div class="form-submit">
                            <button onClick={handleOnClick} >Change Password</button>
                        </div>
                    </div>}
                </div>
            </div>}

            {!qFetched && <h1>Loading...</h1>}
            </>
            
        );
    

}
