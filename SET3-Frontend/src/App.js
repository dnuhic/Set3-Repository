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
import Login from './Login/Login'
import useToken from './Meni/components/App/useToken';
import { useEffect } from 'react'

function App() {

    const { token, setToken } = useToken();
    const { userRole, setUserRole } = useState(null);

    if (!token) {
        return <Login setToken={setToken} />
    }
    else {
        useEffect(async () => {

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(token)
            };
            
            await fetch('https://localhost:7194/api/controller/getusertoken', requestOptions).then(res => {
                if (res.status == 400)
                    alert("Wrong token!");
                else {
                    console.log(res.role);
                    setUserRole(res.role);
                        
                }
            });
            
        }, [])
    }



    return (
        <Router>
            <GlobalStyle />
            <Navbar />
            <Routes>
                <Route path="/" element ={<Home />} />

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
                {userRole == 0 &&
                    <Route path="/users" element={<Users />} />}

                
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



            

            </Router>

    );
}

export default App;
