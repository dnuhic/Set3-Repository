import * as ReactDOM from 'react-dom';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import React, { Component, useEffect, useState } from 'react';
import '../OrderPage/OrdersStyle.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Filter } from '@mui/icons-material';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import DateTimePicker from 'react-datetime-picker';
import { TextField } from '@material-ui/core';

export default function ExcelImportPage() {

    const [data, setData] = useState(null);
    const [dataForPage, setDataForPage] = useState(null);
    const [allShops, setAllShops] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [allCategories, setAllCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [startDateTime, setStartDateTime] = useState(null);
    const [endDateTime, setEndDateTime] = useState(null);
    const [page, setPage] = useState({
        skip: 0,
        take: 10,
    });

    const applyFilter = () => {

        var newData = data;
        if (selectedStore != 'All Shops')
            newData = data.filter(d => d.shopName == selectedStore);

        if (document.getElementById("nazivProdukta").value != '')
            newData = newData.filter(d => d.productName == document.getElementById("nazivProdukta").value);

        if (selectedCategory != "All Categories")
            newData = newData.filter(d => d.productCategory == selectedCategory);

        if (startDateTime != null && endDateTime != null) {
            var date1 = new Date(startDateTime);
            var date2 = new Date(endDateTime);
            if (date2.getTime() < date1.getTime()) {
                alert("End date must be past the start date!");
                setDataForPage(data);
                return;
            }
            newData = newData.filter(d => new Date(d.dateTime).getTime() >= date1.getTime()
                && new Date(d.dateTime).getTime() <= date2.getTime());
        }

        setDataForPage(newData);


    };
    const downloadTxtFile = (data, columnNameArray) => {
        /* const data = "p,a,b\n1,2,3";*/

        const csvString = [
            [
                "Shop Name",
                "Shop Address",
                "Product Name",
                "Product Category",
                "Product Price",
                "Quantity",
                "Date",
                "Register name",
                "Table name"

            ],
            ...data.map(item => [
                item.shopName,
                item.shopAdress,
                item.productName,
                item.productCategory,
                item.productPrice,
                item.quantity,
                item.dateTime,
                item.cashRegisterName,
                item.TableName
            ])
        ]
            .map(e => e.join(","))
            .join("\n");

        console.log(csvString);

        const element = document.createElement("a");
        const file = new Blob([csvString], {
            type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "report.csv";
        document.body.appendChild(element);
        element.click();
    };

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    useEffect(async () => {
        /*      const requestOptions = {
                  method: 'GET',
                  headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
                  credentials: 'same-origin'
              };*/

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/OrderModels/shoptopdfExport`);
        const dataResponse = await response.json()
        setData(dataResponse)
        setDataForPage(dataResponse)
        console.log(dataResponse);

        const requestOptionsShop = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };
        const responseShop = await fetch(`${process.env.REACT_APP_BACKEND_URL}ShopModels`, requestOptionsShop);
        const dataShop = await responseShop.json();
        var filterDataShop = dataShop.filter(s => !s.deleted)
        setAllShops(filterDataShop);
        setSelectedStore("All Shops");

        const getRequest = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };

        const responseKategorije = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/CategoryModels`, getRequest);
        const kategorije = await responseKategorije.json();
        setAllCategories(kategorije);
        console.log(kategorije);
        setSelectedCategory("All Categories");
    }, [])

    const handleChange = (e) => {
        setSelectedStore(e.target.value)
    }

    const handleChangeCat = (e) => {
        setSelectedCategory(e.target.value)
    }

    const handleChangeStartTime = (e) => {
        //setSelectedCategory(e.target.value)
        console.log(e);
        setStartDateTime(e);
    }


    const handleChangeEndTime = (e) => {
        //setSelectedCategory(e.target.value)
        console.log(e);
        setEndDateTime(e);
    }

    return (<>

        {data && allShops && dataForPage && allCategories &&
            <Box sx={{
                width: '80%',
                padding: '20px',
                height: '40%',
                bgcolor: '#a8c0c0',
                boxShadow: 16,
                borderRadius: '0 0 20px 20px',
                position: 'relative',
                overflow: 'auto',
                margin: 'auto'
            }}><div className="col">
                    Select the wanted filter
                    <div>
                        Shop name:
                    </div>
                    <select id="role" onChange={handleChange}>
                        <option value="All Shops">All Shops</option>
                        {allShops.map(e => <option value={e.name}>{e.name}</option>)}
                    </select>
                    <div className="row">
                        <div className="col">
                            Product name:
                            <input
                                id="nazivProdukta"
                                type="text"
                                className="form-control"
                                placeholder="Product name"
                            />
                        </div>
                    </div>
                    <div>
                        Categories:
                        <select id="role" className="form-select" name="categories" onChange={handleChangeCat}>
                            <option value="All Categories">All Categories</option>
                            {allCategories &&
                                allCategories.map(q => <option>{q.name}</option>)}
                        </select>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div>
                            Choose the date-time period for the filters
                        </div>
                        <div>
                            Start date:
                        </div>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            onChange={handleChangeStartTime}
                        />
                        <div>
                            End date:
                        </div>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            onChange={handleChangeEndTime}
                        />
                    </LocalizationProvider>
                </div>
                <Button title="Export Excel" onClick={applyFilter}>
                    Apply filter
                </Button>
                <div className="mainDiv">
                    <Button title="Export Excel" onClick={() => downloadTxtFile(dataForPage, ["shopName", "shopAdress", "productName", "productCategory", "productPrice", "quantity", "dateTime"])}>
                        Export to Excel
                    </Button>

                    <Grid
                        data={dataForPage}


                        style={{
                            height: '420px'
                        }} >




                        <GridColumn field="shopName" title="Shop Name" width="50px" />
                        <GridColumn field="shopAdress" title="Shop Address" width="350px" />
                        <GridColumn field="productName" title="Product Name" />
                        <GridColumn field="productCategory" title="Product Category" />
                        <GridColumn field="productPrice" title="Product Price" />
                        <GridColumn field="quantity" title="Quantity" width="50px" />
                        <GridColumn field="dateTime" title="Date" width="350px" />
                        <GridColumn field="cashRegisterName" title="Register name" width="350px" />
                        <GridColumn field="tableName" title="Table name" width="350px" />
                    </Grid>
                </div>
            </Box>
        }{
            !data && <h1>Loading...</h1>
        }
    </>);
};