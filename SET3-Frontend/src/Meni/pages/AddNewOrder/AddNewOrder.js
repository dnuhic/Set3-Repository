import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState, useEffect, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import { ListItemAvatar, Avatar } from '@mui/material';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';


const AddNewOrder = () => {

    const [products, setProducts] = useState(null);
    const [shops, setShops] = useState(null);
    const [shop, setShop] = React.useState('');
    const [productIds, setProductIds] = useState([]);
    const [quantities, setQuantities] = useState([]);
    //const [stockQuantity, setStockQuantity] = useState(null);

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
        console.log('Duzina niza data');
        console.log(data.length);
        setId(data);
        setProducts(data);
        setQuantities(Array(data.length).fill(0))
        console.log(quantities);
       
    }

    const setId = async (products) => {

        let pomNizId = [];
        for (let k of products) {
            pomNizId.push(k.id);
        }
        console.log(pomNizId);
        setProductIds(pomNizId)
        console.log('Id-evi proizvoda');
        console.log(productIds);
    }


    useEffect(getData, [])

    const getShops = async () => {
        const requestOptionsShop = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };
        const responseShop = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels`, requestOptionsShop);
        const dataShop = await responseShop.json();
        var filterDataShop = dataShop.filter(s => !s.deleted)
        setShops(filterDataShop);
        setShop(filterDataShop[0].id);
    }

    useEffect(getShops, [])

    const handleSubmit = async () => {
        const bodyObject = {
            "ShopId": shop,
            "ProductIds": productIds,
            "Quantities": quantities
        }
        console.log('Ovo se salje u backend')
        console.log(bodyObject);
        console.log(JSON.stringify(bodyObject));
        const requestOptions = {
            method: "POST",
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
            body: JSON.stringify(bodyObject),
            credentials: 'same-origin'
        };
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/OrderModels/order/${shop}`, requestOptions);
        const data = await response.json();
        alert('Your order has been saved!')
        console.log(data);
    };

    const handleChange = (event) => {
        setShop(event.target.value);

        console.log('Id od izabranog shopa je:')
        console.log(event.target.value)
    };

    const handleQuantity = (id, value) => {
        if (Number(value) < 0) {
            alert('Quantity must be above zero!')
            return;
        }
        else if (isNaN(value) || Number(value) === 0) return;
        else if (products[id].quantity < value) {
            alert('Selected quantity is not avaliable');
            return;
        }
        setQuantities(oldQuantities => {
            const newQuantities = [...oldQuantities]
            newQuantities[id] = Number(value)
            return newQuantities
        })

        console.log('Kolicine su:')
        console.log(quantities)
    };



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
            margin: 'auto'
        }}>
            {products && <>
                <h1>New Order</h1>
                <h3></h3>
                <ButtonGroup disableElevation variant="contained" sx={{
                    width: '80%', margin: 'auto', display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}>
                    <div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Shops</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={shop}
                                onChange={handleChange}
                                label="Shops"
                            >
                                
                                {shops && shops.map(e => <MenuItem value={e.id}>{e.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                    <Button onClick={handleSubmit}>Create order</Button>
                </ButtonGroup>
                <h1></h1>
                <List sx={{ width: '80%', margin: 'auto', bgcolor: 'background.paper', borderRadius: '15px'}}>
                    {products && products.map((product, index) => {

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
                                <ListItemButton role={undefined} dense
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MarkunreadMailboxIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemIcon className="col-3">
                                        <TextField
                                            type="number"
                                            edge="start"
                                            label="Quantity"
                                            id={"id" + product.id}
                                            value={quantities[index]}
                                            sx={{ m: 1, width: '10ch', marginRight: '50px' }}
                                            onChange={event =>handleQuantity(index, event.target.value) }
                                        />
                                    </ListItemIcon>
                                    <ListItemText className="col-3" primaryTypographyProps={{ fontSize: '17px' }} primary={product.name} />
                                    <ListItemText className="col-3" primaryTypographyProps={{ fontSize: '17px' }} primary={product.categoryName} />
                                    <ListItemText className="col-3" primaryTypographyProps={{ fontSize: '17px' }} primary={product.quantity} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </>}
            {!products && <h1>Loading...</h1>}
        </Box>

    );

};

export default AddNewOrder;