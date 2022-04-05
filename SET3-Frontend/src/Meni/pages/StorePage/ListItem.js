import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from 'react';

function ListItem(props) {

    let navigate = useNavigate();

    const handleDelete = () => {

    }

    const handleEdit = () => {

    }

    const handleStoreClick = () => {
        navigate(`/cashRegister/${props.store.id}`);
    }

    return (
        <MuiListItem
            key={props.store.id}
            secondaryAction={
                <div style={{ paddingLeft: 100 }}>
                    <IconButton onClick={handleEdit} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete} color="primary">
                        <DeleteForeverIcon />
                    </IconButton>
                </div>
            }
        >
            <ListItemText primary={`${props.store.name}`} onClick={handleStoreClick} />
        </MuiListItem>
    )
}

export default ListItem