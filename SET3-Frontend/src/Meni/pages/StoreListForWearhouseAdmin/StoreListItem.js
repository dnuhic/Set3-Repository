import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import { ListItemAvatar, Avatar } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import InfoIcon from '@mui/icons-material/Info';
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"

import { useState, useEffect } from 'react';

function StoreListItem(props) {

    let navigate = useNavigate();

    const handleStoreClick = () => {
        navigate(`/productsinshop/${props.store.id}`);
    }
    
    return (
            <MuiListItem
                sx={{
                    padding: 2,
                    maxHeight: '2000px',
                }}
            key={props.store.id}>
            <ListItemAvatar>
                <Avatar>
                    <StoreIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${props.store.name}`}  />
            <ListItemAvatar>
                <Avatar>
                    <InfoIcon onClick={handleStoreClick} style={{ cursor: "pointer" }}/>
                </Avatar>
            </ListItemAvatar>
        </MuiListItem>
    )
}

export default StoreListItem