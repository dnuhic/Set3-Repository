import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import './Login.css';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", authflag: 1 };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ username: event.state.username, password: event.state.password });
    }
    //ADD - za admin i korisnik login - koji se homepage otvara
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.username == 'admin@littech.in' && this.state.password == 'secret') {
            this.props.history.push("/home");
        } else {
           
        }
    }
    render() {
        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item>
                        <Grid 
                            container
                            direction="column"
                            justify="center"
                            spacing={2}
                            className="login-form"
                            
                        >
                            <Paper style={{
                                backgroundColor: '#C4C4C4' }}
                                variant="elevation"
                                elevation={2}
                                className="login-background"
                            >
                                <Grid item>
                                    <Typography component="h1" variant="h5">
                                        Sign in
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <form onSubmit={this.handleSubmit}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item>
                                                <TextField 
                                                    style={{
                                                        backgroundColor: '#FFFFFF'
                                                    }}
                                                    type="email"
                                                    placeholder="Email"
                                                    fullWidth
                                                    name="username"
                                                    variant="outlined"
                                                    value={this.state.username}
                                                    onChange={(event) =>
                                                        this.setState({
                                                            [event.target.name]: event.target.value,
                                                        })
                                                    }
                                                    required
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    style={{
                                                        backgroundColor: '#FFFFFF'
                                                    }}
                                                    type="password"
                                                    placeholder="Password"
                                                    fullWidth
                                                    name="password"
                                                    variant="outlined"
                                                    value={this.state.password}
                                                    onChange={(event) =>
                                                        this.setState({
                                                            [event.target.name]: event.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Grid>
                                            
                                            <Grid item>
                                                <Button style={{backgroundColor: '#421818' }}
                                                    variant="contained"
                                                    type="submit"
                                                    className="button-block"
                                                >
                                                    Login
                                                </Button>
                                                </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default Login;