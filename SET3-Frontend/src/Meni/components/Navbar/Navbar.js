import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Nav, NavbarContainer, MenuIcon, NavMenu, NavItem, NavLinks, NavItemBtn, NavBtnLink } from './NavbarElements'
import { Button } from '../../../globalStyles';




const Navbar = () => {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        }
        else setButton(true);
    }

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

                            <NavItem>
                                <NavLinks to='/settings'> Settings </NavLinks>
          
                            </NavItem>

                            <NavItem>
                                <NavLinks to='/users'> Users </NavLinks>
                            </NavItem>

                            <NavItem>
                                <NavLinks to='/form'> Add user</NavLinks>
                            </NavItem>

                            <NavItemBtn>

                                { button ? (
                                    <NavBtnLink to="/log-in">
                                        <Button primary> LogIn </Button>

                                    </NavBtnLink>
                                ) : (
                                    <NavBtnLink to="/log-in">
                                        <Button fontBig primary>
                                             LogIn

                                        </Button>
                                    </NavBtnLink>
                                )}

              

                            </NavItemBtn>

                            <NavItemBtn>
                            {button ? (
                                <NavBtnLink to="/home">
                                    <Button primary> LogOut </Button>

                                </NavBtnLink>
                            ) : (
                                <NavBtnLink to="/home">
                                    <Button fontBig primary>
                                        LogOut
                                    </Button>
                                </NavBtnLink>
                            )}
                        </NavItemBtn>
                        </NavMenu>


                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar