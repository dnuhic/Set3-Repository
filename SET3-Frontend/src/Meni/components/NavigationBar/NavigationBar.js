import LogOutButton from './LogOutButton';
import { Navbar, Nav, NavDropdown, Dropdown, Container, NavItem, NavLink } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './custom-dropdown-menu.css';
import { Button } from '../../../globalStyles';
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BookIcon from '@mui/icons-material/Book';
import Typography from '@mui/material/Typography';

function NavigationBar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);
    let navigate = useNavigate();

    const handleClick = () => setClick(!click);
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        }
        else setButton(true);
    }

    useEffect(async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain', "Access-Control-Allow-Credentials": true },
            credentials: 'include',
            body: document.cookie
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}authentication/getusertoken`, requestOptions);

        const data = await response.json();

        setRole(data.role);
    }, [])


    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    useEffect(async () => {
        if (role != null) {
            const requestOptions = {
                method: 'GET',
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
                credentials: 'same-origin'
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}authentication/getUserId`, requestOptions);

            const data = await response.json();

            setUser(data);
            console.log(user);
        }




    }, [role])



    useEffect(
        () => {
            showButton();

        }, []);

    window.addEventListener('resize', showButton);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    {role && user && <Nav activeKey={window.location.pathname}>
                        <div className='d-flex align-content-center flex-wrap'>
                            <SettingsIcon style={{ color: 'white' }}/>
                        </div>
                        <NavDropdown
                            menuVariant="dark"
                            title="Options"
                        >
                            <NavDropdown.Item href={'/settings/' + user.id}>Settings</NavDropdown.Item>
                            <NavDropdown.Item href={'/resetPassword/' + user.id}>Reset password</NavDropdown.Item>
                            <NavDropdown.Item href={'/twoFactorAuthentication/' + user.id}>Two factor authentication</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>}

                    {role == "Admin" && <Nav activeKey={window.location.pathname}>
                        <div className='d-flex align-content-center flex-wrap'>
                            <GroupIcon style={{ color: 'white' }} />
                        </div>
                        
                        <NavDropdown
                            menuVariant="dark"
                            title="Users"
                        >
                            <NavDropdown.Item href={'/users'}>All users</NavDropdown.Item>
                            <NavDropdown.Item href={'/addNewUser'}>Add new user</NavDropdown.Item>
                            <NavDropdown.Item href={'/accessRights'}>User access rights</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>}

                    {(role == "Admin" || role == "ShopAdmin") && <Nav activeKey={window.location.pathname}>
                        <div className='d-flex align-content-center flex-wrap'>
                            <ShoppingCartIcon style={{ color: 'white' }} />
                        </div>
                        
                        <NavDropdown
                            menuVariant="dark"
                            title="Shop"
                        >
                            <NavDropdown.Item href={'/shops'}>Shops</NavDropdown.Item>
                            <NavDropdown.Item href={'/addShop'}>Add new shop</NavDropdown.Item>
                            <NavDropdown.Item href={'/addCashRegister'}>Add new register</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>}

                    {(role == "Admin" || role == "StockAdmin") && <Nav activeKey={window.location.pathname}>
                        <div className='d-flex align-content-center flex-wrap'>
                            <WarehouseIcon style={{ color: 'white' }} />
                        </div>
                        
                        <NavDropdown
                            menuVariant="dark"
                            title="Warehouse"
                        >
                            <NavDropdown.Item href={'/products'}>Products</NavDropdown.Item>
                            <NavDropdown.Item href={'/warehouseShops'}>Shops</NavDropdown.Item>
                            <NavDropdown.Item href={'/addProduct'}>Add new product</NavDropdown.Item>
                            <NavDropdown.Item href={'/addDelivery'}>Add delivery</NavDropdown.Item>
                            <NavDropdown.Item href={'/addOrder'}>Add order</NavDropdown.Item>
                            
                        </NavDropdown>
                    </Nav>}

                    {(role == "Admin" || role == "StockAdmin") && <Nav activeKey={window.location.pathname}>
                        <div className='d-flex align-content-center flex-wrap'>
                            <AssessmentIcon style={{ color: 'white' }} />
                        </div>

                        <NavDropdown
                            menuVariant="dark"
                            title="Records"
                        >
                            <NavDropdown.Item href={'/orders'}>Orders</NavDropdown.Item>
                            <NavDropdown.Item href={'/allDeliveries'}>Deliveries</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>}

                    
                </Navbar.Collapse>
                <Nav>
                    {!role && <NavItem>
                        <Button onClick={() => navigate("/log-in", { replace: true })}>
                                Log in
                        </Button>
                    </NavItem>
                        }
                        
                        
                    </Nav>
                {role &&
                            <LogOutButton button={button}></LogOutButton>
                        }
            </Container>
        </Navbar>
    );
}

export default NavigationBar;