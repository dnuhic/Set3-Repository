import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";

const AddAUserForm = () => {
    
    const [createdUser, setCreatedUser] = useState(false);
    const [questions, setQuestions] = useState(null);
    const nizPitanja = []

    useEffect( async() => {
        const pitanjaResponse =  await fetch('https://localhost:7194/SecurityQuestionModels')
        const pitanja =  await pitanjaResponse.json();

        console.log(pitanja);

      //  const nizPitanja = []
        /*for (const k of pitanja) {
            nizPitanja.push(k.question);
        }*/
        setQuestions(pitanja);
     //   console.log(questions);
    }, []);

    const idPitanja = () => {
        if (questions != null) {
        for (let pitanje of questions) {
            if (pitanje.question == document.getElementById("pitanja").value)
                return pitanje.id;
        }

        return -1;
        }
        
    }

    const newUser = () => {

        if (questions != null) {
            if (document.getElementById("ime").value == "" ||
                document.getElementById("prezime").value == "" ||
                document.getElementById("e-mail").value == "" ||
                document.getElementById("password").value == "" ||
                document.getElementById("answer").value == "") {
                alert("All fields must not be empty!");
                return;
            } else if (document.getElementById("password").value.length < 8) {
                alert("Password must contain at least 8 characters!");
                return;
            } else if (!document.getElementById("e-mail").value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                alert("Email must be valid!");
                return;
            }

            let user = {
                "Email": document.getElementById("e-mail").value,
                "FirstName": document.getElementById("ime").value,
                "LastName": document.getElementById("prezime").value,
                "Password": document.getElementById("password").value,
                "Role": {
                    "RoleType": 1
                },
                "RoleId": 1,
                "QuestionId": idPitanja(),
                "Answer": document.getElementById("answer").value,
                "Deleted": false
            }

            setCreatedUser(user);

            console.log(user);

            document.getElementById("ime").value = "";
            document.getElementById("prezime").value = "";
            document.getElementById("e-mail").value = "";
            document.getElementById("password").value = "";
            document.getElementById("answer").value = "";
            alert("Action completed!");

        }

       
    }

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }


    useEffect(async () => {
        if (pitanja != null) {
            // POST request using fetch inside useEffect React hook
            console.log(createdUser);
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
                credentials: 'same-origin',
                body: JSON.stringify(createdUser)
            };
            fetch('https://localhost:7194/usermodels', requestOptions)
                .then(response => { response.json(); console.log(response); })
                .then(data => {
                    console.log(data)
                });

        }
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [createdUser]);

    return (
        <form className="unos">
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <input
                            id="ime"
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            onChange={() => {
                                let imeOsobe = document.getElementById("ime").value
                                if (hasNumber(imeOsobe))
                                    console.log("ima broj")
                                else
                                    console.log("nema broj")
                            }
                            }
                        />
                    </div>
                </div>
                <div className="col">
                    <input
                        id="prezime"
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                    />
                </div>
            </div>
            <input
                id="e-mail"
                type="email"
                className="form-control"
                placeholder="E-mail"
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>


            <div className="mb-3">
                <input type="password" className="form-control" id="password" placeholder="Password"></input>
            </div>

            <div>Choose a question</div>
            <select name="pitanja" id="pitanja">
                {questions && questions.length &&
                    questions.map(q => <option>{q.question}</option>)
                }
            </select>
            

            <input
                id="answer"
                type="text"
                className="form-control"
                placeholder="Your answer"
            />

            <button
                type="button"
                className="btn btn-primary"
                onClick={newUser}
            >
                Add
            </button>
        </form>
    );

    function hasNumber(myString) {
        return /\d/.test(myString);
    }
};

export default AddAUserForm;