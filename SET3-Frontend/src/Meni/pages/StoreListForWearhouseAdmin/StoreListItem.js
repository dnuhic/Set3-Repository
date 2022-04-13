import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"

import { useState, useEffect } from 'react';

function StoreListItem(props) {

    let navigate = useNavigate();
/*
    const handleStoreClick = () => {
            navigate(`/cashRegister/${props.store.id}`);
    }
    */
    return (
        <MuiListItem
            key={props.store.id}>
            <ListItemText primary={`${props.store.name}`} />
        </MuiListItem>
    )
}

export default StoreListItem