import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { ListItemAvatar, Avatar } from '@mui/material';
import Divider from '@mui/material/Divider';
import StoreIcon from '@mui/icons-material/Store';
import InfoIcon from '@mui/icons-material/Info';

import { useState, useEffect } from 'react';

function ListItem(props) {

    const [deleted, setDeleted] = useState(props.store.deleted);
    let navigate = useNavigate();


    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }
    const handleDelete = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
            body: JSON.stringify({"Id": props.store.id}),
            credentials: 'same-origin'
        };
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels/deleteShop/${props.store.id}`, requestOptions);
        ResponseCheckModule.unauthorizedResponseCheck(response, navigate)
        const data = await response.json();
        setDeleted(true);
        console.log(data);


    }

    const handleEdit = () => {
        navigate(`/editshop/${props.store.id}`);

    }

    const handleStoreClick = () => {
        if(!deleted)
            navigate(`/cashRegister/${props.store.id}`);
    }

    return (
        <MuiListItem
            key={props.store.id}
            secondaryAction={
                <div style={{ paddingLeft: 100 }}>
                    <IconButton onClick={handleEdit} disabled={deleted} color={!deleted ? "primary" : "secondary"}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete} disabled={deleted} color={!deleted ? "primary" : "secondary"}>
                        <DeleteForeverIcon />
                    </IconButton>
                    <IconButton onClick={handleStoreClick} disabled={deleted} color={!deleted ? "primary" : "secondary"}>
                        <InfoIcon />
                    </IconButton>
                </div>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <StoreIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${props.store.name}`} />
        </MuiListItem>
    )
}

export default ListItem