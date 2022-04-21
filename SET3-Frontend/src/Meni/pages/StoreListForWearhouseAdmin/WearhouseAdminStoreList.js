import ListItem from './StoreListItem'
import Box from '@mui/material/Box';
import { default as MuiList } from '@mui/material/List';

import { useState, useEffect } from 'react';

function WearhouseAdminStoreList(props) {

    const [stores, setStores] = useState([])
    const [store, setToDelete] = useState(null);




    useEffect(() => {
        setStores(props.stores);
        console.log(stores);
    }, [])



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
        return <ListItem store={object}/>
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

export default WearhouseAdminStoreList