import * as ReactDOM from 'react-dom';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import React, { Component, useEffect, useState } from 'react';
import '../OrderPage/OrdersStyle.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ExcelExportPage() {

    const [data, setData] = useState(null);
    const [page, setPage] = useState({
        skip: 0,
        take: 10,
    });
    const _export = React.useRef(null);

    const exportExport = () => {
        if (_export.current !== null) {
            _export.current.save(data);
        }
    };

    useEffect(async () => {
  /*      const requestOptions = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };*/

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/OrderModels/shoptopdf`);
        const dataResponse = await response.json()
        setData(dataResponse)
        console.log(dataResponse);

    },[])

    return <ExcelExport ref={_export}>
       
        {data &&
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
        }}>
            <div className="mainDiv">
                <Button title="Export Excel"  onClick={exportExport}>
                    Export to Excel
                </Button>
            <Grid
            data={data}
            
            ref={_export}
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
                </Grid>
                </div>
        </Box>
        }{
            !data && <h1>Loading...</h1>
        }
    </ExcelExport>;
};