import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styleForm.css';



export default function ResetPassword() {

    const { id } = useParams();
    const [userFetched, setUserFetched] = useState(null);
    const [qFetched, setqFetched] = useState(null);
    const [vidljivo, setVidljivo] = useState(null);
    const getData = async () => {

        //console.log(id);
        const response = await fetch('https://localhost:7194/usermodels/'+id);

        


        //console.log(response);
        const data = await response.json();
        //console.log(data);
        
        setUserFetched(data);



    }

    useEffect(getData, []);
    useEffect(async () => {
        const question = await fetch('https://localhost:7194/SecurityQuestionModels/' + id + '/forgotPassword');
        const data = await question.json();
        //console.log(question);
        //console.log(data);
        //console.log(data.question);
        setqFetched(data.question);
    }, [userFetched]);



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


        return (
            <div class="form-container">
                <div action="#" class="form-wrap">
                    <h1>Reset Password</h1>

                    <div class="form-box">
                        {qFetched && <div>{qFetched} </div>}
                        {!qFetched && <p> Loading... </p>}
                        <input type="text" id = "odgovor" placeholder="Your Answer" required />
                    </div>
                    <div className="form-submit">
                        <button onClick={handleChange}>Confirm</button>
                    </div>


                    {vidljivo && <div class="form-click">

                        <div class="form-box" >

                            <p>Choose new security question</p>
                            <select name="pitanja" id="pitanja">
                                <option value="rigatoni">Defaultno pitanje iz baze</option>
                                <option value="dave">Dave</option>
                                <option value="pumpernickel">Pumpernickel</option>
                                <option value="reeses">Reeses</option>
                            </select>



                            <input type="password" placeholder="Current Password" required />
                        </div>
                        <div class="form-box">
                            <input type="password" placeholder="New Password" required />
                        </div>
                        <div class="form-box">
                            <input type="password" placeholder="Confirm New Password" required />
                        </div>

                        <div class="form-submit">
                            <input type="submit" value="Reset Password" />
                        </div>
                    </div>}
                </div>
            </div>
        );
    

}
