
import './UpdateUserComponent.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React from 'react';
import { display } from '@mui/system';
import { useParams } from 'react-router-dom';


class UpdateUserComponent extends React.Component {
    constructor(props) {
        super(props);
        this.user = null;
    }

    compoentDidMount() {
        const id = this.props.match.params.id;
        console.log("OVDJE JE " + id);
        console.log(window.location.hash.split('/')[2], 'this is my id')
        fetch('https://localhost:7194/usermodels/' + id)
            .then(res => res.json)
            .then(json => {
                this.setUser(json);
                console.log("povucen korisnik");
            });
    }
    

    state = {
        disabled: true,
        hidden: true

    }



    handleChange = (e) => {
        if (e.target) {
            this.setState({
                disabled: !this.state.disabled,
                hidden: !this.state.hidden
            });

        }



    }

    showButton = (e) => {
        if (e.target) {
            this.setState({
                disabled: !this.state.disabled,
                hidden: !this.state.hidden
            });





        }

    }
    render() {
        return (

            <div className="App">
                <div className="main-box">

                    <div className="container" >
                        <div className="updateUser-box">
                            <input type="text" value={ this.user.firstName } disabled={this.state.disabled}></input>
                            <input type="text" value={this.user.lastName} disabled={this.state.disabled}></input>
                            <input type="text" value={this.user.email} disabled={this.state.disabled}></input>
                            <Stack direction="column" spacing={2} height="30%" width="40%" margin="2%" >
                                <Button className="editButton" variant="outlined" onClick={this.showButton} >Edit</Button>

                                <div hidden={this.state.hidden} >
                                    <Button className="submitButton" variant="outlined" onClick={this.handleChange}>Submit</Button>
                                    <Button className="cancelButton" variant="outlined" onClick={this.handleChange} >Cancel</Button>

                                </div>

                            </Stack>
                        </div>

                        <div className="edit-role">
                            <p>edit role </p>

                        </div>
                    </div>

                    <div className="updatePassword-box">
                        <p>Ovdje će ići promjena passworda.</p>
                    </div>
                </div>

            </div>
        );
    }
}

export default UpdateUserComponent;
