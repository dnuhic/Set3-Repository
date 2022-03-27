import React, { Component, useState, useEffect, useCallback } from 'react';


export default function AllUsersComponent () {
    const [allUsers, setAllUsers] = useState([]);
    const[allUsersFetched, setAllUsersFetched] = useState(false);


    const getData = async () => {
        console.log("?????");
        const response = await fetch('/api/UserModels', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log(response);
        const data = await response.json();
        console.log("udje ovdje");
        setAllUsers(data);
    }

    useEffect(() => {
        setAllUsersFetched(true);
    }, [allUsers])

    return <div>
        <button onClick={getData}>ispisi</button>
        {allUsersFetched && <div>
            {allUsers}
        </div>}
        {!allUsersFetched && <div>
            Loading...
        </div>
        }
    </div>
}