import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState, useEffect, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import '../styleForm.css';
import Box from '@mui/material/Box';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { ListItemAvatar, Avatar } from '@mui/material';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';

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
        setProducts(data.filter(p => !p.deleted));
    }

    useEffect(getData, [])

    /*const validateQuantity = () => {
        products.map(product => {
            const kol = parseFloat(document.getElementById("id" + data.id).value)
            if (product.measuringUnit === 'Units' && (q % 1) != 0) {
                alert('Quantity in units must be integer')
                
            }
        })
    }*/

    const handleSubmit = () => {
        if (products != null) {
            var postojiJedna = false;
            var neispravanUnit = false;
            const niz = [];
            var today = new Date();

            products.forEach(product => {
                const kol = parseFloat(document.getElementById("id" + product.id).value)
                if (product.measuringUnit === 'Units' && (kol % 1) != 0) {
                    //alert('Quantity in units must be integer')
                    neispravanUnit = true;
                    return
                }
            })
            products.map(data => {
                const q = parseFloat(document.getElementById("id" + data.id).value);
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
            }
            else if (neispravanUnit) {
                alert('Quantity in units must be integer');
                return;
            }
            else {
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
        <Box sx={{
            width: '60%',
            padding: '20px',
            height: '40%',
            bgcolor: '#a8c0c0',
            boxShadow: 16,
            borderRadius: '0 0 20px 20px',
            position: 'relative',
            overflow: 'auto',
            margin: 'auto',
        }}>
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
                    <button onClick={handleSubmit}>Create delivery</button>
                </ButtonGroup>
                <h1></h1>
                <List sx={{ width: '80%', margin: 'auto', bgcolor: 'background.paper', borderRadius: '15px',}}>
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
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <ListItemButton role={undefined} dense
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}

                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <LocalShippingIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemIcon className="col-3">
                                    <TextField
                                        type="number"
                                        edge="start"
                                        label="Quantity"
                                        id={"id" + product.id}
                                        defaultValue={0}
                                        sx={{ m: 1, width: '10ch', marginRight: '50px' }}
                                    />
                                </ListItemIcon>
                                <ListItemText className="col-4" primaryTypographyProps={{ fontSize: '17px' }} primary={product.measuringUnit} />
                                <ListItemText className="col-4" primaryTypographyProps={{ fontSize: '17px' }} primary={product.name} />
                                <ListItemText className="col-2" primaryTypographyProps={{ fontSize: '17px' }} primary={product.categoryName} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
                </List>
                </>}
            {!products && <h1>Loading...</h1>}
        </Box>
        
    );
}
