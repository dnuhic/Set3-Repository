import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '../../../globalStyles';
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Dropdown, Container, NavItem, NavLink } from 'react-bootstrap';

export default function LogOutButton(props) {
    const { button } = props;

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Nav>
            {button ? (
                <NavItem>
                    <Button primary onClick={handleClickOpen}> Log out </Button>

                </NavItem>
            ) : (
                <NavItem>
                    <Button fontBig primary onClick={handleClickOpen}>
                        Log out
                    </Button>
                </NavItem>
            )
            }
            <SimpleDialog open={open} onClose={handleClose} ></SimpleDialog>
        </Nav>
    );
}
function SimpleDialog(props) {
    const { onClose, open } = props;
    let navigate = useNavigate();

    const handleClose = () => {
        onClose();
    };
    const handleLogOut = () => {
        document.cookie.split(";").forEach(function (c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        onClose();
        navigate("/log-in", { replace: true });
        window.location.reload(false);
        
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Log Out ?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to log out ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                    <Button primary onClick={handleLogOut}> Yes </Button>
                <Button primary onClick={handleClose}> Cancel </Button>
            </DialogActions>
        </Dialog>
    );
}