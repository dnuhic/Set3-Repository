import ListItem from './ListItem'
import Box from '@mui/material/Box';
import { default as MuiList } from '@mui/material/List';

import { useState, useEffect } from 'react';

function List(props) {

    const [sampleData, setSampleData] = useState([])
    const [register, setToDelete] = useState(null);
    const [deletedRegister, setDeletedRegister] = useState(null);

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    useEffect(() => {
        setSampleData(props.sampleData);
        console.log(sampleData);
    }, [])



    function deleteCashbox(object) {
        console.log(object);
        setToDelete(object);
    }

    useEffect(() => {
        if (register != null) {
            const newRegister = {
                "Id": register.id,
                "ShopId": register.shopId,
                "Description": register.description,
                "Deleted": true
            }

            setDeletedRegister(newRegister);
        }


    }, [register])



    useEffect(async () => {
        if (deletedRegister != null) {
            const requestOptions = {
                method: "PUT",
                headers: { "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
                body: JSON.stringify(deletedRegister),
            };
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/CashRegisterModels/${register.id}`, requestOptions);
            console.log(response);

            const index = sampleData.indexOf(register, 0);
            const sampleDataCopy = sampleData;
            sampleDataCopy[index] = deletedRegister;
            setSampleData(sampleDataCopy);
        }
    }, [deletedRegister])



    const listComponents = sampleData.map((object) => {
        return <ListItem cashbox={object} deleteAction={deleteCashbox} />
    })

    function handleSort() {
        const sortedData = [...sampleData].sort((a, b) => {
            return a.description > b.description ? 1 : -1
        })

        setSampleData(sortedData);
    }

    function handleSort1() {
        const sortedData = [...sampleData].sort((a, b) => {
            return a.description < b.description ? 1 : -1
        })

        setSampleData(sortedData);
    }

    return (
        <>
            <button onClick={handleSort} id="sorta-z"> A-Z  </button>
            <button onClick={handleSort1} id="sortz-a"> Z-A </button>
            <Box sx={{
                width: '100%',
                maxWidth: 500,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
            }}>
                <MuiList>
                    {listComponents}
                </MuiList>
            </Box >

        </>
    )
}

export default List