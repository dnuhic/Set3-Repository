import { Link } from 'react-router-dom';

function ListItem(props) {

    return (
        <Link to={`/users/${props.user.id}`} >
            {`${props.user.firstName} ${props.user.lastName}`}
        </Link>
    )
}

export default ListItem