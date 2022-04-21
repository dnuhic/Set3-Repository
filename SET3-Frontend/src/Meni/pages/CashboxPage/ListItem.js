import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import { ListItemAvatar, Avatar } from '@mui/material';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import { useState, useEffect } from 'react';

function ListItem(props) {

    let navigate = useNavigate();
    const [deleted, setDeleted] = useState(props.cashbox.deleted);
    const { deleteAction } = props;

    const handleDelete = () => {
        setDeleted(true);
        deleteAction(props.cashbox);
    }
    const handleEdit = () => {
        navigate(`/editcashRegister/${props.cashbox.id}`);
    }

    return (
        <MuiListItem
            key={props.cashbox.id}
            secondaryAction={
                <div style={{ paddingLeft: 100 }}>
                    <IconButton onClick={handleEdit} disabled={deleted} color={!deleted ? "primary" : "secondary"}>
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
                    <LaptopChromebookIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${props.cashbox.description}`} />
        </MuiListItem>
    )
}

export default ListItem