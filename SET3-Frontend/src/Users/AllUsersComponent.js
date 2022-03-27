import React, { Component, useState, useEffect, useCallback } from 'react';


export default function AllUsersComponent () {
    const [allUsers, setAllUsers] = useState([]);
    const[allUsersFetched, setAllUsersFetched] = useState(false);

    const getData = async () => {
        const response = await fetch('https://localhost:7194/usermodels');

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
            {allUsers.length}
        </div>}
        {!allUsersFetched && <div>
            Loading...
        </div>}
    </div>
}