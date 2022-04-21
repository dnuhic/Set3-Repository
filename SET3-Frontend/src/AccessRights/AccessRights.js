import { React,useState,useEffect } from 'react';
import './AccessRights.css';
import ResponseCheckModule from '../Meni/pages/ErrorPage/ResponseCheckModule'
import { useNavigate } from "react-router-dom"

const AccessRights = () => {
    const navigate = useNavigate()
    const [rights, setRights] = useState([]);

    useEffect(() => {
        const getRights = async () => {
            const rightsFromServer = await fetchRights()
            setRights(rightsFromServer);
        }
        getRights();
    }, [])

    const fetchRights = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/RoleModels`)
        ResponseCheckModule.unauthorizedResponseCheck(res, navigate)
        const data = await res.json();
        return data;
    }

    const postRights = async () => {
        let requests = [];
        for (const object of rights) {
            console.log(JSON.stringify(object));
            console.log(`${process.env.REACT_APP_BACKEND_URL}api/RoleModels/${object.id.toString()}`)
            requests.push(
                fetch(`${process.env.REACT_APP_BACKEND_URL}api/RoleModels/${object.id.toString()}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT',
                    body: JSON.stringify(object)
                }).then(async (response) => {
                    ResponseCheckModule.unauthorizedResponseCheck(response, navigate)
                    const body = await response.text();
                    if (response.status !== 200) throw Error(body.message);
                    // if everything is fine resiolve to true or for example your body content
                    return Promise.resolve(true);
                }).catch((e) => {
                    // if we encounter an error resolve to false
                    console.log(e.message);
                    console.error('there was an error:', e.message)
                    return Promise.resolve(false);
                })
            )
        }
        await Promise.all(requests).then((results) => {
            // here we have all the results
            console.log('all requests finished!', results);
            for (let i = 0; i < requests.length; i++) {
                console.log(i, 'request resulted in', results[i]);
            }
        })
        alert("You have successfully changed the access rights!")
    }

    const changeRead= (index,e) => {
        const temp = rights;
        temp[index].readAccess = e.target.checked;
        setRights(temp)
    }
    const changeWrite = (index, e) => {
        const temp = rights;
        temp[index].writeAccess = e.target.checked;
        setRights(temp)
    }
    const changeDelete = (index, e) => {
        const temp = rights;
        temp[index].deleteAccess = e.target.checked;
        setRights(temp)
    }

    return (
                    <div className="App">
            <div className="Naslov">
                <h1>Change access rights</h1>
            </div>
            <div>
                <table >
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Read</th>
                            <th>Write</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                <tbody>
                    { rights.map((rol,index) =>
                            <tr key={index}>
                            <td>{rol.roleName}</td>
                            <td><input type="checkbox" onChange={e => changeRead(index, e)} defaultChecked={rol.readAccess} /></td>
                            <td><input type="checkbox" onChange={e => changeWrite(index, e)} defaultChecked={rol.writeAccess} /></td>
                            <td><input type="checkbox" onChange={e => changeDelete(index, e)} defaultChecked={rol.deleteAccess} /></td>
                            </tr>
                        )}
                    </tbody>
            </table>
                <button type="button" id="spremi" name="formBtn" onClick={e => postRights()}>Save </button>
                </div>
            </div>
        )
}

export default AccessRights


