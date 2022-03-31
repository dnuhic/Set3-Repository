import React, { Component } from 'react';
import './AccessRights/AccessRights.css';



export default class AccessRights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: []
        }
    }
    refreshList() {
        fetch('localhost:7194/api/RoleModels')
            .then(response => response.json())
            .then(data => {
                this.setState({ roles: data });
            });
    }
    componentDidMount() {
        this.refreshList();
    }
    render() {
        const {
            roles
        } = this.state;

        return (

            <div className="App">
                <div className="Naslov">
                    <h1>Promjena prava pristupa za sve korisnike</h1>
                </div>
                <table >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tip</th>
                            <th>Read</th>
                            <th>Write</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map(rol =>
                            <tr key={rol.Id}>
                                <td>{rol.Id}</td>
                                <td>{rol.RoleName}</td>
                                <td>{rol.ReadAccess}</td>
                                <td>{rol.WriteAccess}</td>
                                <td>{rol.DeleteAccess}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button type="button" id="spremi" name="formBtn">Save </button>
            </div>
        );
    }
}
