import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";


function ListItem(props) {

   
    let navigate = useNavigate();

    

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }
    


    return (
        <MuiListItem
            key={props.product.id}
        >
            <ListItemText primary={`${props.product.name} - Category: ${props.product.categoryName} - Quantity: ${props.product.quantity}`} />
        </MuiListItem>
    )
}

export default ListItem