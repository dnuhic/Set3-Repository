import ListItem from './ListItem'
import Box from '@mui/material/Box';
import { default as MuiList } from '@mui/material/List';

import { useState, useEffect } from 'react';

function List(props) {

    const [stores, setStores] = useState([])
    const [store, setToDelete] = useState(null);
    

    

    useEffect(() => {
        setStores(props.stores);
        console.log(stores);
    }, [])



    function deleteStore(object) {
        console.log(object);
        setToDelete(object);
    }

    function handleSort() {
        const sortedData = [...stores].sort((a, b) => {
            return a.name > b.name ? 1 : -1
        })

        setStores(sortedData);
    }

    function handleSort1() {
        const sortedData = [...stores].sort((a, b) => {
            return a.name < b.name ? 1 : -1
        })

        setStores(sortedData);
    }


    const listComponents = stores.map((object) => {
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