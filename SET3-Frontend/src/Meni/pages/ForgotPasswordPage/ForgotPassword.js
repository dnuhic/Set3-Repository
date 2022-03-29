import React, { Component } from 'react';
import '../styleForm.css';



export default class ForgotPassword extends Component {

    state = {
        hidden: true
    }

    handleChange = (e) => {
        if (e.target) {
            this.setState({
                hidden: !this.state.hidden
            });
        }
    }

    render() {
        return (
            <div className="form-container">
                <form name="myForm" className="form-wrap" >
                    <h1>Forgot Password</h1>
                    <div className="form-box">
                        <p> Please enter the email you use to sign in.</p>
                        <input id="email" type="email" name="email" placeholder="E-mail Adress" required />
                    </div>
                    <div className="form-submit">
                        <button onClick={this.handleChange}>Send</button>

                    </div>




                </form>
            </div>
        );
    }

}
