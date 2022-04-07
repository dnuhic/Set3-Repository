import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from 'react';

function ListItem(props) {

    const [deleted, setDeleted] = useState(props.product.deleted);
    let navigate = useNavigate();

    const { deleteAction } = props;

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }
    const handleDelete = async () => {
        setDeleted(true);
        deleteAction(props.product);
    }

    const handleEdit = () => {
        navigate(`/form2/${props.product.id}`);

    }


    return (
        <MuiListItem
            key={props.product.id}
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
            <ListItemText primary={`${props.product.name} - Category: ${props.product.categoryName} `} />
        </MuiListItem>
    )
}

export default ListItem