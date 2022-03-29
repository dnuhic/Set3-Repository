import "./UpdateUserComponent.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

const UpdateUserComponent = (props) => {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatetUser] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [notMatchingPasswordsAlert, setNotMatchingPasswordsAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  ////
  //const [nameError, setNameError] = useState("Invalid email");
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const [editPassword, setEditPassword] = useState(true);

  const getData = async () => {
    console.log(id);
    const response = await fetch("https://localhost:7194/usermodels/" + id);
    console.log(response);
    const data = await response.json();
    console.log(data);

    setUser(data);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setCurrentPassword(data.password);
  };

  useEffect(getData, []);

  const handleEditButtonClikc = () => {
    setEdit(true);
  };

  const handleSaveButtonClikc = () => {
    console.log("USER: " + user);
    console.log(user);
    const newUser = {
      Id: user.id,
      Email: document.getElementById("email").value,
      FirstName: document.getElementById("firstName").value,
      LastName: document.getElementById("lastName").value,
      Password: newPassword !== null && newPassword !== "" ? newPassword : user.password,
      Question: {
        id: 2,
        Question: "pitanje",
      },
      QuestionId: 2,
      Answer: user.answer,
      Deleted: user.deleted,
    };

    setUpdatetUser(newUser);
    setEdit(false);
  };

  useEffect(async () => {
    console.log(updatedUser);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    };

    const response = await fetch("https://localhost:7194/usermodels/" + user.id, requestOptions);
    const data = await response.json();
    console.log(data);
  }, [updatedUser]);

  const handleCancelButtonClikc = () => {
    setEdit(false);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCancelButtonClikc1 = () => {
    setEditPassword(false);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    checkMatchingPasswords(event.target.value, retypeNewPassword);
  };
  const handleRetypeNewPasswordChange = (event) => {
    setRetypeNewPassword(event.target.value);
    checkMatchingPasswords(event.target.value, newPassword);
  };

  const checkMatchingPasswords = (pass1, pass2) => {
    if (pass1 !== pass2) {
      setNotMatchingPasswordsAlert(true);
      setAlertText("Passwords are not matching!");
    } else {
      setNotMatchingPasswordsAlert(false);
    }
  };

  const handleSubmitPassword = () => {
    if (newPassword === null || newPassword === "" || retypeNewPassword === null || retypeNewPassword === "") {
      setNotMatchingPasswordsAlert(true);
      setAlertText("Fields cannot be empty!");
    } else {
      setNotMatchingPasswordsAlert(false);
      handleSaveButtonClikc();
    }
  };

  return (
    <>
      {!user && <div>Loading...</div>}
      {user && (
        <div className="App">
          <div className="main-box">
            <div className="container">
              <div className="updateUser-box">
                <h1> Edit User</h1>
                <input id="firstName" type="text" value={firstName} disabled={!edit} onChange={handleFirstNameChange}></input>
                <input id="lastName" type="text" value={lastName} disabled={!edit} onChange={handleLastNameChange}></input>
                <input id="email" type="text" value={email} disabled={!edit} onChange={handleEmailChange}></input>

                {!edit && (
                  <button className="editButton" variant="contained" onClick={handleEditButtonClikc}>
                    Edit
                  </button>
                )}
                {edit && (
                  <div>
                    <button className="submitButton" variant="contained" onClick={handleSaveButtonClikc}>
                      Submit
                    </button>
                    <button className="cancelButton" variant="contained" onClick={handleCancelButtonClikc1}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="edit-role">
                <p>edit role </p>
              </div>
            </div>

            <div className="updatePassword-box">
              <h1>Change Password</h1>
              <label>
                {" "}
                Current Password:
                <input id="password" type="password" value={currentPassword} readOnly />
              </label>
              <label>
                {" "}
                New Password:
                <input
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    handleNewPasswordChange(e);
                  }}
                />
              </label>
              <label>
                {" "}
                Re-type New Password:
                <input
                  id="password"
                  type="password"
                  value={retypeNewPassword}
                  onChange={(e) => {
                    handleRetypeNewPasswordChange(e);
                  }}
                />
              </label>
              {notMatchingPasswordsAlert && (
                <Alert variant="outlined" severity="error" sx={{ marginTop: "10px", marginBottom: "10px" }}>
                  {alertText}
                </Alert>
              )}

              {!edit && (
                <div className="buttons">
                  <button className="SubmitBtn" variant="outlined" onClick={handleSubmitPassword}>
                    Submit
                  </button>
                  <button className="cancelButton1" variant="outlined" onClick={handleCancelButtonClikc}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUserComponent;
