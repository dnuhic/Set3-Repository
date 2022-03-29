import React, { Component } from 'react';
import '../styleForm.css';



export default class ForgotPasswordConfirm extends Component {

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

                    <div id="hideShow">
                        <div className="form-box">
                            <input type="password" placeholder="New Password" required />
                        </div>
                        <div className="form-box">
                            <input type="password" placeholder="Confirm New Password" required />
                        </div>

                        <div className="form-submit">
                            <input type="submit" value="Set New Password" />
                        </div>

                    </div>


                </form>
            </div>
        );
    }

}
