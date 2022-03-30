import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './Meni/components';
import { Link } from 'react-router-dom';
import Home from './Meni/pages/HomePage/Home';
import Settings from './Meni/pages/SettingsPage/Settings';
import Login from './Login/Login';
import Users from './Meni/pages/UsersPage/Users';
import UpdateUserComponent from './Meni/pages/EditUserPage/UpdateUserComponent'

function App() {

    

    return (

        <Router>
            <GlobalStyle />
            <Navbar />
            <Routes>
                <Route path="/" element ={<Home />} />

            </Routes>

            <Routes>
                <Route path="/settings" element={<Settings />} />

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

               
                <Route path="/users/:id" render={(props) => <UpdateUserComponent
                    {...props} />} />
            </Routes>



            

         </Router>
        

    );
}

export default App;
