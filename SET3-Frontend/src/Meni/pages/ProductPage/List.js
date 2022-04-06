import ListItem from './ListItem'
import Box from '@mui/material/Box';
import { default as MuiList } from '@mui/material/List';

import { useState, useEffect } from 'react';

function List(props) {

    const [products, setProducts] = useState([])
    const [product, setToDelete] = useState(null);




    useEffect(() => {
        setProducts(props.products);
        console.log(products);
    }, [])



    function deleteProduct(object) {
        console.log(object);
        setToDelete(object);
    }

    function handleSort() {
        const sortedData = [...products].sort((a, b) => {
            return a.name > b.name ? 1 : -1
        })

        setProducts(sortedData);
    }

    function handleSort1() {
        const sortedData = [...products].sort((a, b) => {
            return a.name < b.name ? 1 : -1
        })

        setProducts(sortedData);
    }


    const listComponents = products.map((object) => {
        return <ListItem product={object} deleteAction={deleteProduct} />
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