import ListItem from './ListItem'
import Box from '@mui/material/Box';
import { default as MuiList } from '@mui/material/List';

import { useState, useEffect } from 'react';

function List(props) {

    const [sampleData, setSampleData] = useState([])
    const [user, setToDelete] = useState(null);
    const [deletedUser, setDeletedUser] = useState(null);

    

    useEffect(() => {
        setSampleData(props.sampleData);
        console.log(sampleData);
    }, [])



    function deleteStore(object) {
        console.log(object);
        setToDelete(object);
    }

    function handleSort() {
        const sortedData = [...sampleData].sort((a, b) => {
            return a.name > b.name ? 1 : -1
        })

        setSampleData(sortedData);
    }

    function handleSort1() {
        const sortedData = [...sampleData].sort((a, b) => {
            return a.name < b.name ? 1 : -1
        })

        setSampleData(sortedData);
    }


    const listComponents = sampleData.map((object) => {
        return <ListItem store={object} deleteAction={deleteStore} />
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