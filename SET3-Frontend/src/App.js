import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './Meni/components';
import { Link } from 'react-router-dom';
import Home from './Meni/pages/HomePage/Home';
import AddUser from './Meni/pages/AddAUserPage/AddAUserForm';
import Settings from './Meni/pages/SettingsPage/Settings';
import Login from './Meni/pages/LoginPage/Login';
import Users from './Meni/pages/UsersPage/Users';
import ForgotPassword from './Meni/pages/ForgotPasswordPage/ForgotPassword';
import ForgotPasswordConfirm from './Meni/pages/ForgotPasswordConfirmPage/ForgotPasswordConfirm';
import ResetPassword from './Meni/pages/ResetPasswordPage/ResetPassword';
import UpdateUserComponent from './Meni/pages/EditUserPage/UpdateUserComponent'


function App() {


    return (

            < Router >
                <GlobalStyle />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />

                </Routes>

                <Routes>
                    <Route path="/settings/:id" element={<Settings />} />

                </Routes>

                <Routes>
                    <Route path="/log-in" element={<Login />} />

                </Routes>

                <Routes>
                    <Route path="/home" element={<Home />} />

                </Routes>

                <Routes>
                    <Route path="/users" element={<Users />} />

                </Routes>

                <Routes>

                    <Route path="/form" element={<AddUser />} />

                </Routes>

                <Routes>
                    <Route path="/forgotPassword" element={<ForgotPassword />} />

                </Routes>

                <Routes>
                    <Route path="/forgotPasswordConfirm/:id" element={<ForgotPasswordConfirm />} />

                </Routes>

                <Routes>
                    <Route path="/resetPassword/:id" element={<ResetPassword />} />

                </Routes>

                <Routes>

                    <Route path="/users/:id" element={<UpdateUserComponent />} />
                </Routes>


            </Router >
            
        );
    

    /*if (!token) {
        return <Login setToken={setToken} />
    }*/
    

    
}

export default App;
