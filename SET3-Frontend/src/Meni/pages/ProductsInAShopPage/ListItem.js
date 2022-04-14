import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';


function ListItem(props) {

   
    let navigate = useNavigate();

    

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }
    


    return (
        <>
            <Divider dark />
            <MuiListItem
                key={props.product.id}
                secondaryAction={
                    <div style={{ paddingLeft: 100 }}>
                        <IconButton>
                            <Badge badgeContent={`${props.product.quantity}`} color={"primary"}>
                                <ShoppingCartIcon color="action" />
                            </Badge>
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
            <Divider dark />
        </>
    )
}

export default ListItem