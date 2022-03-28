
import './App.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React from 'react';
import { display } from '@mui/system';


class App extends React.Component {
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
                            <input type="text" value="John" disabled={this.state.disabled}></input>
                            <input type="text" value="Smith" disabled={this.state.disabled}></input>
                            <input type="text" value="johnSmith@gmail.com" disabled={this.state.disabled}></input>
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

export default App;
