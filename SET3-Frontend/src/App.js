import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './Meni/components';
import { Link } from 'react-router-dom';
import Home from './Meni/pages/HomePage/Home';
import Settings from './Meni/pages/SettingsPage/Settings';
import Login from './Meni/pages/LoginPage/Login';
import Users from './Meni/pages/UsersPage/Users';

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

            

         </Router>
        

    );
}

export default App;
