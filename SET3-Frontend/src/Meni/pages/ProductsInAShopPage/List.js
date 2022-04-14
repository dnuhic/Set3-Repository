import ListItem from './ListItem'
import Box from '@mui/material/Box';
import { default as MuiList } from '@mui/material/List';
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"

import { useState, useEffect } from 'react';

function List(props) {

    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [product, setToDelete] = useState(null);
   

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    useEffect(() => {
        setProducts(props.products);
        console.log(products);
    }, [])


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


    useEffect(() => {
        if (product != null) {
            const newProduct = {
                "Id": product.id,
                "StockId": product.stockId,
                "Name": product.name,
                "CategoryName": product.categoryName,
                "Deleted": true,
                "Barcode": product.barcode,
                "BarcodeText": product.barcodeText,
                "Quantity": product.quantity
            }

       
        }


    }, [product])

    const listComponents = products.map((object) => {
        return <ListItem product={object}  />
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
                borderRadius: 10,
            }}>
                <MuiList sx={{
                    padding: 0,
                }}>
                    {listComponents}
                </MuiList>
            </Box >

        </>
    )
}

export default List