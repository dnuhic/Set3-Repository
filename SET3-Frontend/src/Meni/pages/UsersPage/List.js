import ListItem from './ListItem'
import Box from '@mui/material/Box';
import { default as MuiList } from '@mui/material/List';

import { useState, useEffect } from 'react';

import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"


function List(props) {

    const navigate = useNavigate()

    const [sampleData, setSampleData] = useState([])
    const [user, setToDelete] = useState(null);
    const [deletedUser, setDeletedUser] = useState(null);

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    useEffect(() => {
        setSampleData(props.sampleData);
        console.log(sampleData);
    }, [])

    function handleSort() {
        const sortedData = [...sampleData].sort((a, b) => {
            return a.firstName > b.firstName ? 1 : -1
        })

        setSampleData(sortedData);  
    }

    function handleSort1() {
        const sortedData = [...sampleData].sort((a, b) => {
            return a.firstName < b.firstName ? 1 : -1
        })

        setSampleData(sortedData);
    }

    function deleteUser(object) {
        console.log(object);
        setToDelete(object);      
    }



    useEffect(() => {
        if (user != null) {
            const newUser = {
                "Id": user.id,
                "Email": user.email,
                "FirstName": user.firstName,
                "LastName": user.lastName,
                "Password": user.password,
                "RoleName": user.roleName,
                "QuestionId": user.questionId,
                "Answer": user.answer,
                "Deleted": true,
                "TFA": user.tfa
            }

            setDeletedUser(newUser);
        }

        
    }, [user])



    useEffect(async () => {
        console.log(deletedUser);
        if (deletedUser != null) {
            const requestOptions = {
                method: "POST",
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
                body: JSON.stringify(deletedUser),
                credentials: 'same-origin'
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}usermodels/${user.id}`, requestOptions);
            ResponseCheckModule.unauthorizedResponseCheck(response, navigate)
            console.log(response);
            const data = await response.json();
            console.log(data);

            const index = sampleData.indexOf(user, 0);
            const sampleDataCopy = sampleData;
            sampleDataCopy[index] = deletedUser;
            setSampleData(sampleDataCopy);
        }
    }, [deletedUser])

    const listComponents = sampleData.map((object) => {
        return <ListItem user={object} deleteAction={deleteUser}/>
    })


    return (
        <> 
            
            <Box sx={{
                width: '100%',
                maxWidth: 500,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                borderRadius: 10,
            }}>
                <MuiList sx={{
                    padding: 0,
                    maxHeight: '2000px',
                }}>
                    {listComponents}
                </MuiList>
            </Box >

        </>
    )
}

export default List