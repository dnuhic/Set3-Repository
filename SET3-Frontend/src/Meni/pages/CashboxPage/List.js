import ListItem from './ListItem'
import Box from '@mui/material/Box';
import { default as MuiList } from '@mui/material/List';

import { useState, useEffect } from 'react';

function List(props) {

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



    function deleteCashbox(object) {
        console.log(object);
        setToDelete(object);
    }





    const listComponents = sampleData.map((object) => {
        return <ListItem cashbox={object} deleteAction={deleteCashbox} />
    })

    return (
        <>
          
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