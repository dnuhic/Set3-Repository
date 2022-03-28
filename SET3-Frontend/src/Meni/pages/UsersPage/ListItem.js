function ListItem(props) {
    const handleOnClick = () => {
        
    }

    return (
        <li onClick={handleOnClick}> {`${props.user.firstName} ${props.user.lastName}`} </li>
    )
}

export default ListItem