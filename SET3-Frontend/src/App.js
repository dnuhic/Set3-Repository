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
import TFA from './Meni/pages/TFAPage/TFA';
import TFAConfirm from './Meni/pages/TFAConfirmPage/TFAConfirm';
import EditUserComponent from './Meni/pages/EditUserPage/EditUserComponent';
import EditShopComponent from './Meni/pages/EditPoslovnicaPage/EditShopComponent'
import AccessRights from './AccessRights/AccessRights';
import CashRegister from './Meni/pages/CashboxPage/CashboxPage'
import StorePage from './Meni/pages/StorePage/StorePage'
import AddShopComponent from './Meni/pages/AddShopPage/AddShopComponent';

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

                    <Route path="/users/:id" element={<EditUserComponent />} />
                </Routes>
                <Routes>

                <Route path="/twoFactorAuthentication/:id" element={<TFA />} />

                </Routes>

                <Routes>

                    <Route path="/editshop/:id" element={<EditShopComponent />} />

                </Routes>

                <Routes>

                    <Route path="/twoFactorAuthenticationConfirm/:id" element={<TFAConfirm />} />

                </Routes>
                 <Routes>

                    <Route path="/accessRights" element={<AccessRights />} />
                </Routes>

		<Routes>
                	<Route path="/addShop" element={<AddShopComponent />} />
            	</Routes>

                <Routes>

                    <Route path="/cashRegister/:id" element={<CashRegister />} />
            </Routes>

            <Routes>

                <Route path="/stores" element={<StorePage />} />
            </Routes>

            <Routes>

                <Route path="/settings" element={<Settings />} />
            </Routes>
          

            </Router >
            
        );
    

    /*if (!token) {
        return <Login setToken={setToken} />
    }     */
    

    
}

export default App;
