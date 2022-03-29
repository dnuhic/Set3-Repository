import React, { Component } from 'react';
import '../styleForm.css';



export default class ResetPassword extends Component {

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
            <div class="form-container">
                <form action="#" class="form-wrap">
                    <h1>Reset Password</h1>

                    <div class="form-box">
                        <p> Sequrity Question: Dodati iz baze pitanje       </p>
                        <input type="text" placeholder="Your Answer" required />
                    </div>
                    <div className="form-submit">
                        <button onClick={this.handleChange}>Confirm</button>
                    </div>

                    <div class="form-click" hidden={this.state.hidden}>

                        <div class="form-box" >

                            <p>Choose new sequrity question</p>
                            <select name="pitanja" id="pitanja">
                                <option value="rigatoni">Defaultno pitanje iz baze</option>
                                <option value="dave">Dave</option>
                                <option value="pumpernickel">Pumpernickel</option>
                                <option value="reeses">Reeses</option>
                            </select>



                            <input type="password" placeholder="Current Password" required />
                        </div>
                        <div class="form-box">
                            <input type="password" placeholder="New Password" required />
                        </div>
                        <div class="form-box">
                            <input type="password" placeholder="Confirm New Password" required />
                        </div>

                        <div class="form-submit">
                            <input type="submit" value="Reset Password" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}
