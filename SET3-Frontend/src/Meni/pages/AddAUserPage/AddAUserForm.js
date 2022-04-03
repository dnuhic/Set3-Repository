import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";

const AddAUserForm = () => {
    
    const [createdUser, setCreatedUser] = useState(false);
    const [questions, setQuestions] = useState(null);
    const [users, setAllUsers] = useState(null);
    const nizPitanja = []

    const [roles, setRoles] = useState(null);
    const [role, setRole] = useState(null);

    const [pass, setPass] = useState('');


    useEffect( async() => {
        const pitanjaResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}SecurityQuestionModels`)
        const pitanja = await pitanjaResponse.json();

        console.log('pitanja iz baze')
        console.log(pitanja);

        console.log('Pitanja response');
        console.log(pitanjaResponse);
        setQuestions(pitanja);

        const responseRole = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/RoleModels`)
        const dataRoles = await responseRole.json();

        setRole(dataRoles[0].roleName);
        setRoles(dataRoles);

        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}usermodels`, requestOptions);
        const data = await response.json();
        setAllUsers(data);

      //  const nizPitanja = []
        /*for (const k of pitanja) {
            nizPitanja.push(k.question);
        }*/
      

        console.log('setQuestions(pitanja)')
        console.log(questions);


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

    const checkEmail = () => {
        const emails = users.map(u => u.email);
        let pom = emails.includes(document.getElementById("e-mail").value);

        return pom;
    }

    const newUser = () => {

        if (questions != null && roles != null && users != null) {
            if (document.getElementById("ime").value == "" ||
                document.getElementById("prezime").value == "" ||
                document.getElementById("e-mail").value == "" ||
                document.getElementById("password").value == "" ||
                document.getElementById("answer").value == "") {
                alert("All fields must not be empty!");
                return;
            } else if (checkEmail()) {
                alert("There is already an account with that e-mail in the database. Please use another one.");
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
                "Password": pass,
                "RoleName": role,
                "QuestionId": idPitanja(),
                "Answer": document.getElementById("answer").value,
                "Deleted": false,
                "TFA":""
            }

            setCreatedUser(user);

            console.log(user);

            document.getElementById("ime").value = "";
            document.getElementById("prezime").value = "";
            document.getElementById("e-mail").value = "";
            //document.getElementById("password").value = "";
            setPass('');
            document.getElementById("answer").value = "";
            alert("Action completed!");

        }

       
    }

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }


    useEffect(async () => {
        if (nizPitanja != null && questions != null && roles != null && users != null) {
            // POST request using fetch inside useEffect React hook
            console.log(createdUser);
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
                credentials: 'same-origin',
                body: JSON.stringify(createdUser)
            };
            fetch(`${process.env.REACT_APP_BACKEND_URL}usermodels`, requestOptions)
                .then(response => { response.json(); console.log(response); })
                .then(data => {
                    console.log(data)
                });

        }
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [createdUser]);

    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }
    console.log(pass)
    return (
        <>
            {roles && role && questions && users && <form className="unos">
                <div className="col">
                    <h1>Create new user</h1>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <input
                                id="ime"
                                type="text"
                                className="form-control"
                                placeholder="First name"
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
                <div className="row">
                    <div className="col">

                        <div className="form-click">
                            <div className="form-box">
                                <select name="role" id="role" value={role} onChange={handleRoleChange}>
                                    {roles && roles.length &&
                                        roles.map(q => <option value={q.roleName}>{q.roleName}</option>)
                                    }
                                </select>
                            </div>
                        </div>
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
                    <input id="password" type="password" value={ pass} className="form-control" placeholder="Password" onInput={e => {
                        setPass(e.target.value)
                    }}></input>
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
                    Create user
                </button>
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
            </form>
            }
            {
                !(roles && role && users && questions) && <h1>Loading...</h1>
            }
            </>
       
    );

    function hasNumber(myString) {
        return /\d/.test(myString);
    }
};

export default AddAUserForm;