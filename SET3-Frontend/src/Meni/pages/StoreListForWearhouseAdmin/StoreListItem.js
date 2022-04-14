import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import { ListItemAvatar, Avatar } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"

import { useState, useEffect } from 'react';

function StoreListItem(props) {

    let navigate = useNavigate();

    const handleStoreClick = () => {
        navigate(`/productsinshop/${props.store.id}`);
    }
    
    return (
        <MuiListItem
            key={props.store.id}>
            <ListItemAvatar>
                <Avatar>
                    <StoreIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${props.store.name}`} onClick={handleStoreClick} style={{cursor: "pointer"}}/>
        </MuiListItem>
    )
}

export default StoreListItem