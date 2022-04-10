import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './Meni/components';
import NavigationBar from './Meni/components/NavigationBar/NavigationBar'
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
import EditProduct from './Meni/pages/EditProductPage/EditProductForm';
import EditShopComponent from './Meni/pages/EditPoslovnicaPage/EditShopComponent';
import AccessRights from './AccessRights/AccessRights';
import AddCashRegister from './Meni/pages/AddCashRegister/AddCashRegister';
import CashRegister from './Meni/pages/CashboxPage/CashboxPage'
import StorePage from './Meni/pages/StorePage/StorePage'
import AddShopComponent from './Meni/pages/AddShopPage/AddShopComponent';
import ProductPage from './Meni/pages/ProductPage/ProductPage'
import EditCashRegisterComponent from './Meni/pages/EditCashRegisterPage/EditCashRegisterComponent';
import AddProduct from './Meni/pages/AddProductPage/AddProduct'
import UnauthorizedError from './Meni/pages/ErrorPage/UnauthorizedError';
import ProductToShop from './Meni/pages/ProductToShop/ProductToShop';
function App() {


    return (
            
            < Router >
                <GlobalStyle />
                <NavigationBar />
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

                    <Route path="/addNewUser" element={<AddUser />} />

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
                <Route path="/addCashRegister" element={<AddCashRegister/>} />
                </Routes>
		<Routes>
                	<Route path="/addShop" element={<AddShopComponent />} />
            	</Routes>

                <Routes>

                    <Route path="/cashRegister/:id" element={<CashRegister />} />
            </Routes>

            <Routes>

                <Route path="/editcashRegister/:id" element={<EditCashRegisterComponent />} />
            </Routes>

            <Routes>

                <Route path="/shops" element={<StorePage />} />
            </Routes>

            <Routes>

                <Route path="/settings" element={<Settings />} />
            </Routes>

            <Routes>
              <Route path="/products" element={<ProductPage />} />
            </Routes>

            <Routes>
                <Route path="/addProduct" element={<AddProduct/>} />
            </Routes>

            <Routes>
                <Route path="/editProduct/:id" element={<EditProduct />} />
            </Routes>

            <Routes>
                <Route path="/unauthorized" element={<UnauthorizedError />} />
            </Routes>

            <Routes>

                <Route path="/productToShop" element={<ProductToShop />} />
            </Routes>

            </Router >
            
        );
    

    /*if (!token) {
        return <Login setToken={setToken} />
    }     */
}

export default App;
