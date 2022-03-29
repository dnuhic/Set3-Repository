import React, { useState, useEffect } from 'react';
import "./UserComponent.css";


const UserComponent=(props) =>{
    return (
        <div>

            <thead>
                <tr>
                    <th>{props.name}</th>
                    <th>{props.surname}</th>
                    <th>{props.email}</th>
                    <th>
                        <a href='#'><th><span class="update">UPDATE</span></th></a>
                    </th>
                    <th>
                        <a href='#'><th><span class="delete">DELETE</span></th></a>
                    </th>

                </tr>
            </thead>

        </div>
    )

}

export default UserComponent;