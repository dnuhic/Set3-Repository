import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';

const AddAUserForm = () => {
    
    const [createdUser, setCreatedUser] = useState(false);
    const [questions, setQuestions] = useState(null);
    const nizPitanja = []

    useEffect( async() => {
        const pitanjaResponse =  await fetch('https://localhost:7194/SecurityQuestionModels')
        const pitanja =  await pitanjaResponse.json();

        console.log(pitanja);

      //  const nizPitanja = []
        for (const k of pitanja) {
            nizPitanja.push(k.question);
        }
        setQuestions(nizPitanja);
        console.log(nizPitanja[0])
        console.log('ovo se smijesta u setter');
     //   console.log(questions);
    }, []);

    const newUser = () => {

        if (document.getElementById("ime").value == "" ||
            document.getElementById("prezime").value == "" ||
            document.getElementById("email").value == "" ||
            document.getElementById("password").value == "" ||
            document.getElementById("answer").value == "") {
            alert("All fields must not be empty!");
            return;
        } else if (document.getElementById("password").value.length < 8) {
            alert("Password must contain at least 8 characters!");
            return;
        } else if (!document.getElementById("email").value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            alert("Email must be valid!");
            return;
        }

        let user = {
            "Email": document.getElementById("email").value,
            "FirstName": document.getElementById("ime").value,
            "LastName": document.getElementById("prezime").value,
            "Password": document.getElementById("password").value,
            "Question": {
                "Question": "pitanje"
            },
            "QuestionId": 1,
            "Answer": document.getElementById("answer").value,
            "Deleted": false
        }

        setCreatedUser(user);

        document.getElementById("ime").value = "";
        document.getElementById("prezime").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("answer").value = "";
        alert("Action completed!");
    }

    useEffect(async () => {
        // POST request using fetch inside useEffect React hook
        console.log(newUser)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createdUser)
        };
        fetch('https://localhost:7194/usermodels', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            });

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
                id="email"
                type="email"
                className="form-control"
                placeholder="E-mail"
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>


            <div className="mb-3">
                <input type="password" className="form-control" id="password" placeholder="Password"></input>
            </div>

            <div className="dropdown">
                <button id="dropdownMenu" className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Choose a question
                </button>
                 <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    
                </ul> 
              
            </div> 

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