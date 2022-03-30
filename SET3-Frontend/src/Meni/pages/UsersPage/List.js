import ListItem from './ListItem'
import Box from '@mui/material/Box';
import { default as MuiList } from '@mui/material/List';

import { useState, useEffect } from 'react';

function List(props) {

    const [sampleData, setSampleData] = useState([])


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
        const data = sampleData.filter(e => e.id != object.id);
        setSampleData(data);
        //TODO Treba pozvati async function za remove u backendu.
    }

    const listComponents = sampleData.map((object) => {
        return <ListItem user={object} deleteAction={() => { deleteUser(object) }}/>
    })


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
                maxHeight: 300, }}>
                <MuiList>
                    {listComponents}
                </MuiList>
            </Box >

        </>
    )
}

export default List