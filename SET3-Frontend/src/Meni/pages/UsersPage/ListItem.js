import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { ListItemAvatar, Avatar } from '@mui/material';
import Divider from '@mui/material/Divider';


import { useState, useEffect } from 'react';

function ListItem(props) {
    const [deleted, setDeleted] = useState(props.user.deleted);

    const { deleteAction } = props;

    let navigate = useNavigate();

    const handleDelete = () => {
        setDeleted(true);
        deleteAction(props.user);
    }
    const handleEdit = () => {
        navigate(`/users/${props.user.id}`);
    }

    return (
        <>
            <MuiListItem
          key={props.user.id}
            secondaryAction={
                <div style={{paddingLeft: 100}}>
                    <IconButton onClick={handleEdit} disabled={deleted} color={!deleted ? "primary" : "secondary" }>
                  <EditIcon />
                </IconButton>
                    <IconButton onClick={handleDelete} disabled={deleted} color={!deleted ? "primary" : "secondary"}>
                  <DeleteForeverIcon />
                </IconButton>
              </div>
          }
        >
            <ListItemAvatar>
                <Avatar>
                    <PersonIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${props.user.firstName} ${props.user.lastName} `} />
        </MuiListItem>
            </>
    )
}

export default ListItem