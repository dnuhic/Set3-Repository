import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

function ListItem(props) {

    const { deleteAction } = props;
    let navigate = useNavigate();

    const handleDelete = () => {
        deleteAction();
    }
    const handleEdit = () => {
        navigate(`/users/${props.user.id}`);
    }

    return (
        <MuiListItem
          key={props.user.id}
            secondaryAction={
                <div style={{paddingLeft: 100}}>
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
                    <IconButton onClick={handleDelete}>
                  <DeleteForeverIcon />
                </IconButton>
              </div>
          }
        >
            <ListItemText primary={`${props.user.firstName} ${props.user.lastName} `} />
        </MuiListItem>
    )
}

export default ListItem