import {NavBtnLink } from '../../components/Navbar/NavbarElements'

function ListItem(props) {

    return (
        <NavBtnLink to={"/user/" + props.user.id} >
            {`${props.user.firstName} ${props.user.lastName}`}
        </NavBtnLink>
    )
}

export default ListItem