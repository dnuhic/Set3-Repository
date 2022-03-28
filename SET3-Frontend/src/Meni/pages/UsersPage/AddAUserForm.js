import React, { Component, useState, useEffect, useCallback } from 'react';

const AddAUserForm = () => {
    const [allUsers, setAllUsers] = useState(null);
    const [createdUser, setCreatedUser] = useState(false);

    const getData = async () => {
        const response = await fetch('https://localhost:7194/usermodels');

        console.log(response);
        const data = await response.json();
        console.log(data);
        setAllUsers(data);
    }

    useEffect(getData, [])

    const newUser = () => {
        let user = {
            "Email": document.getElementById("email").value,
            "FirstName": "Nejla",
            "LastName": "Begovic",
            "Password": "Sifra",
            "Question": {
                "Question": "pitanje"
            },
            "QuestionId": 1,
            "Answer": "odgovor",
            "Deleted": false
        }

        setCreatedUser(user);
    }

    useEffect(() => {
        // PUT request using fetch inside useEffect React hook

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
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
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
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