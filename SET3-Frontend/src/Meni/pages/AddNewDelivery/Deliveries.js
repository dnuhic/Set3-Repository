import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState, useEffect, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

export default function Deliveries() {

    const [products, setProducts] = useState(null);
    const [deliveries, setDeliveries] = useState(null);

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    const getData = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/ProductModels`, requestOptions);
        //ResponseCheckModule.unauthorizedResponseCheck(response, navigate)

        console.log(response);
        const data = await response.json();
        console.log(data);
        setProducts(data);
    }

    useEffect(getData, [])

    const handleSubmit = () => {
        if (products != null) {
            var postojiJedna = false;
            const niz = [];
            var today = new Date();
            products.map(data => {
                const q = parseInt(document.getElementById("id" + data.id).value);
                if (q > 1000 || q < 0) {
                    postojiJedna = true;
                    return;
                }

                if (q != 0) {
                    const delivery = {
                        Date: today,
                        Quantity: q,
                        ProductId: data.id
                    }

                    niz.push(delivery);
                }
                
                
            })

            if (postojiJedna) {
                alert('Value of quantity can not be smaller than 0, or greater than 1000');
                
                return;
            } else {
                setDeliveries(niz);
            }

            
        }
    }

    useEffect(() => {
        console.log(deliveries)

        if (deliveries !== null) {
            deliveries.map(delivery => {
                
                const postRequest = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Credentials": true },
                    credentials: 'same-origin',
                    body: JSON.stringify(delivery)
                };

                fetch(`${process.env.REACT_APP_BACKEND_URL}api/DeliveryModels`, postRequest)
                    .then(response => { response.json(); console.log(response); })
                    .then(data => {
                        console.log(data);
                        document.getElementById("id" + delivery.ProductId).value = 0;
                    });
            })
            alert('Changes saved successfully')
        }
    }, [deliveries])


    return (
        <>
            {products && <>
                <h1>New Delivery</h1>
                <h3></h3>
                <ButtonGroup disableElevation variant="contained" sx={{
                    width: '80%', margin: 'auto',  display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },}}>
                    <Button onClick={handleSubmit}>Create delivery</Button>
                </ButtonGroup>
                <h1></h1>
                <List sx={{ width: '80%', margin: 'auto', bgcolor: 'background.paper' }}>
                {products.map((product) => {

                    return (
                        <ListItem
                            key={product.id}
                            
                            disablePadding
                            sx={{
                                '&:nth-of-type(even)': {
                                    backgroundColor: '#f0f0f0',
                                },
                                // hide last border
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <ListItemButton role={undefined} dense>
                                <ListItemIcon>
                                    <TextField
                                        type="number"
                                        edge="start"
                                        label="Quantity"
                                        id={"id" + product.id}
                                        defaultValue={0}
                                        sx={{ m: 1, width: '10ch', marginRight: '50px' }}
                                    />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ fontSize: '17px' }} primary={product.name} />
                                <ListItemText primaryTypographyProps={{ fontSize: '17px' }} primary={product.categoryName} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
                </List>
                </>}
            {!products && <h1>Loading...</h1>}
        </>
        
    );
}
