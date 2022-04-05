import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Nav, NavbarContainer, MenuIcon, NavMenu, NavItem, NavLinks, NavItemBtn, NavBtnLink } from './NavbarElements'
import { Button } from '../../../globalStyles';
import LogOutButton from './LogOutButton';




const Navbar = () => {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);

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
        <>
            <IconContext.Provider value={{ color: '#061C35'  }}>
                <Nav>
                    <NavbarContainer>


                        <MenuIcon onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </MenuIcon>

                        <NavMenu onClick={handleClick} click={click}>
                            <NavItem>
                                <NavLinks to='/home'> Home </NavLinks>
                            </NavItem>
                            {role && user &&
                                <NavLinks to={'/settings/' + user.id}>
                                    Settings
                                </NavLinks>
                            }
                            {role && user && 
                                <NavItem>
                                <NavLinks to={'/resetPassword/' + user.id}> Reset password </NavLinks>
                                </NavItem>}
                            {role && user &&
                                <NavItem>
                                <NavLinks to={'/twoFactorAuthentication/' + user.id}> TFA </NavLinks>
                                </NavItem>}

                            {role == "Admin" && 
                                <NavItem>
                                    <NavLinks to='/users'> Users </NavLinks>
                                </NavItem>
                            }

                            {role == "Admin" &&
                                <NavItem>
                                    <NavLinks to='/form'> Add user</NavLinks>
                                </NavItem>
                            }

                            {role == "Admin" &&
                                <NavItem>
                                    <NavLinks to='/accessRights'>Access rights</NavLinks>
                                </NavItem>
                            }
                            
                                {role == "ShopAdmin" &&
                                    <NavLinks to="/stores">
                                         Stores 
                                    </NavLinks>
                                }
                            
                            

                            <NavItemBtn>

                                
                                    {!role &&
                                        <NavBtnLink to="/log-in">
                                            <Button primary> LogIn </Button>

                                        </NavBtnLink>
                                    }
                                

              

                            </NavItemBtn>
                            
                            {role && 
                                <LogOutButton button={button}></LogOutButton>
                            }
                            
                        </NavMenu>


                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar