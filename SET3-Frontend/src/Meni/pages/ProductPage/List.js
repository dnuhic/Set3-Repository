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
    const [deletedProduct, setDeletedProduct] = useState(null);

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

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

    useEffect(() => {
        if (product != null) {
            const newProduct = {
                "Id": product.id,
                "StockId": product.stockId,
                "Name": product.name,
                "CategoryName": product.categoryName,
                "Deleted": true
            }

            setDeletedProduct(newProduct); 
        }


    }, [product])

    useEffect(async () => {
        console.log(deletedProduct);
        if (deletedProduct != null) {
            const requestOptions = {
                method: "POST",
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
                body: JSON.stringify(deletedProduct),
                credentials: 'same-origin'
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/productmodels/${product.id}`, requestOptions);
            ResponseCheckModule.unauthorizedResponseCheck(response, navigate)
            console.log(response);
            const data = await response.json();
            console.log(data);

            const index = products.indexOf(product, 0);
            const productsCopy = products;
            products[index] = deletedProduct;
            setProducts(productsCopy);
        }
    }, [deletedProduct])


    const listComponents = products.map((object) => {
        return <ListItem product={object} deleteAction={deleteProduct} />
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