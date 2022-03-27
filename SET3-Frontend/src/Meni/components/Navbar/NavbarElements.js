import styled from 'styled-components'
import { Container } from '../../globalStyles';
import { Link } from 'react-router-dom';


export const Nav = styled.nav`
background: #061C35;
height: 80px;
display: flex;
justify-content: center;
align-items: center;
font-size: 1.2rem;
position: sticky;
top: 0;
z-index: 999;

`;

export const NavbarContainer = styled(Container)`
display: flex;
justify-content: space-between;
height: 80px;
align-items: center;
background: #061C35;



${Container}
`;

export const MenuIcon = styled.div`
display: none;
background: #061C35;

@media screen and (max-width: 960px) {
display: block;
position: absolute;
top: 0;
right: 0;
transform: translate(-100%, 60%);
font-size: 1.8rem;
cursor: pointer;
background: #061C35;
}
`;

export const NavMenu = styled.ul`
display: flex;
align-items: center;
list-style: none;
text-align: center;
background: #061C35;


@media screen and (max-width: 960px) {
display: flex;
flex-direction: column;
width: 100%;
height: 90vh;
position: absolute;
top: 80px;
left: ${({ click }) => (click ? 0 : '-100%')};
opacity: 1;
transition: all 0.5s ease;
background: #061C35;
}

`;


export const NavItem = styled.li`



&:hover {
border-bottom: 2px solid #fff;
}

@media screen and (max-width: 960px) {
width: 100%;



&:hover {
border: none;
}
}
`;

export const NavLinks = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0.5rem 1rem;
height: 100%;
background: #061C35;


@media screen and (max-width: 960px) {
text-align: center;
padding: 2rem;
width: 100%;
display: table;





&:hover {
color: #96A7BF;
transition: all 0.3s ease;



}
}
`;


export const NavItemBtn = styled.li`

height: 80px;

@media screen and (max-width: 960px) {
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 120px;








}
`;

export const NavBtnLink = styled(Link)`
display: flex;
justify-content: center;
align-items: center;
text-decoration: none;
padding: 8px 16px;
height: 100%;
width: 100%;
border: none;
outline: none;
background: #061C35;



`;

