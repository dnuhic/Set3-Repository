import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from "react-router-dom";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';

import { useState, useEffect } from 'react';
import BarcodeComponent from './Barcode';

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
        navigate(`/editProduct/${props.product.id}`);

    }


    return (
        <>
        <Divider dark />
        <MuiListItem
            key={props.product.id}
            secondaryAction={
                <div style={{ paddingLeft: 100 }}>
                    <IconButton disabled={deleted}>
                        <Badge badgeContent={`${props.product.quantity}`} color={!deleted ? "primary" : "secondary"}>
                            <ShoppingCartIcon color="action" />
                        </Badge>
                    </IconButton>
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
                    <InventoryIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${props.product.name}`} secondary={`${props.product.categoryName}`} />
        </MuiListItem>
        <BarcodeComponent barcode={props.product.barcode} barcodeText={props.product.barcodeText}/>
        <Divider dark/>
        </>
    )
}

export default ListItem