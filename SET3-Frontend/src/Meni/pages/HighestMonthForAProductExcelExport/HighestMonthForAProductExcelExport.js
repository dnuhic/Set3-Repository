﻿import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import React, { useEffect, useState, useRef } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import '../OrderPage/OrdersStyle.css';


export default function ExcelImportPage() {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const isActive = useRef(false);
    /*
    // mockup podaci za popunjavanje pie-charta
    var salesPerMonth2 = [10, 10, 10, 5, 10, 15, 10, 10, 10, 5, 10, 10]
    var totalSales2 = 115

    const mockupData = [
        { title: `January: ${Math.round(salesPerMonth2[0] / totalSales2 * 100)}%`, value: salesPerMonth2[0], color: '#E38627' },
        { title: `February: ${Math.round(salesPerMonth2[1] / totalSales2 * 100)}%`, value: salesPerMonth2[1], color: '#C13C37' },
        { title: `March: ${Math.round(salesPerMonth2[2] / totalSales2 * 100)}%`, value: salesPerMonth2[2], color: '#6A2135' },
        { title: `April: ${Math.round(salesPerMonth2[3] / totalSales2 * 100)}%`, value: salesPerMonth2[3], color: '#0FA3B1' },
        { title: `May: ${Math.round(salesPerMonth2[4] / totalSales2 * 100)}%`, value: salesPerMonth2[4], color: '#B5E2FA' },
        { title: `June: ${Math.round(salesPerMonth2[5] / totalSales2 * 100)}%`, value: salesPerMonth2[5], color: '#F7A072' },
        { title: `July: ${Math.round(salesPerMonth2[6] / totalSales2 * 100)}%`, value: salesPerMonth2[6], color: '#7E9181' },
        { title: `August: ${Math.round(salesPerMonth2[7] / totalSales2 * 100)}%`, value: salesPerMonth2[7], color: '#2E3532' },
        { title: `September: ${Math.round(salesPerMonth2[8] / totalSales2 * 100)}%`, value: salesPerMonth2[8], color: '#4C212A' },
        { title: `October: ${Math.round(salesPerMonth2[9] / totalSales2 * 100)}%`, value: salesPerMonth2[9], color: '#08A4BD' },
        { title: `November: ${Math.round(salesPerMonth2[10] / totalSales2 * 100)}%`, value: salesPerMonth2[10], color: '#EA526F' },
        { title: `December: ${Math.round(salesPerMonth2[11] / totalSales2 * 100)}%`, value: salesPerMonth2[11], color: '#E1CE7A' },
    ]
    */

    const [data, setData] = useState(null);
    const [data2, setData2] = useState(null);
    
    const [dataForPage, setDataForPage] = useState(null);

    const [noviData, setNoviData] = useState([]);
 
   /* const [dataForChartPage, setDataForChartPage] = useState({
        labels: monthNames,
        datasets: [
            {
                label: "sold",
                data: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    }); */
    console.log()
    const [allShops, setAllShops] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    
    const [page, setPage] = useState({
        skip: 0,
        take: 10,
    });

  //  if (noviData.length === 0)
  //      setNoviData(mockupData);
 //   else
  //      console.log("noviData", noviData)

    const applyFilter = () => {
        isActive.current = true;
        var newData = data;
        var newData2 = data2;
;        if (selectedStore != 'Choose a shop')
            newData = data.filter(d => d.shopName == selectedStore);

        if (document.getElementById("nazivProdukta").value != '')
            newData = newData.filter(d => d.productName == document.getElementById("nazivProdukta").value);

        if (selectedStore != 'Choose a shop')
            newData2 = data2.filter(d => d.shopName == selectedStore);

        if (document.getElementById("nazivProdukta").value != '')
            newData2 = newData2.filter(d => d.productName == document.getElementById("nazivProdukta").value);

        var totalSales = 0
       

        for (var i = 0; i < newData.length; i++) {
            totalSales += newData[i].quantity 
        }
        for (var i = 0; i < newData2.length; i++) {
            totalSales += newData2[i].quantity
        }
        

        var salesPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        for (var i = 0; i < 12; i++) {

            for (var j = 0; j < newData.length; j++) {
            
                var datum = new Date (newData[j].dateTime)
              
                if (datum.getMonth() == i) {
                    salesPerMonth[i] += newData[j].quantity
                    console.log(salesPerMonth[i] / totalSales * 100)
                    
                    
                }
            }
            for(var j = 0; j < newData2.length; j++) {

                var datum = new Date(newData2[j].dateTime)

                if (datum.getMonth() == i) {
                    salesPerMonth[i] += newData2[j].quantity
                    console.log(salesPerMonth[i] / totalSales * 100)


                }
            }

            
        }
      //  console.log(dataForPage)
        var newDataForPage = []
        console.log(newDataForPage)
        for (var i = 0; i < 12; i++) {
            newDataForPage.push({
                "monthName": monthNames[i],
                "totalSales": salesPerMonth[i],
                "totalRevenue": salesPerMonth[i] * newData[0].productPrice,
                "percentage": Math.round(salesPerMonth[i] / totalSales * 100) 
            })
            
        }
        const newNoviData = [
            { title: `January: ${Math.round(salesPerMonth[0] / totalSales * 100)}%`, value: salesPerMonth[0], color: '#E38627' },
            { title: `February: ${Math.round(salesPerMonth[1] / totalSales * 100)}%`, value: salesPerMonth[1], color: '#C13C37' },
            { title: `March: ${Math.round(salesPerMonth[2] / totalSales * 100)}%`, value: salesPerMonth[2], color: '#6A2135' },
            { title: `April: ${Math.round(salesPerMonth[3] / totalSales * 100)}%`, value: salesPerMonth[3], color: '#E38627' },
            { title: `May: ${Math.round(salesPerMonth[4] / totalSales * 100)}%`, value: salesPerMonth[4], color: '#C13C37' },
            { title: `June: ${Math.round(salesPerMonth[5] / totalSales * 100)}%`, value: salesPerMonth[5], color: '#6A2135' },
            { title: `July: ${Math.round(salesPerMonth[6] / totalSales * 100)}%`, value: salesPerMonth[6], color: '#E38627' },
            { title: `August: ${Math.round(salesPerMonth[7] / totalSales * 100)}%`, value: salesPerMonth[7], color: '#C13C37' },
            { title: `September: ${Math.round(salesPerMonth[8] / totalSales * 100)}%`, value: salesPerMonth[8], color: '#6A2135' },
            { title: `October: ${Math.round(salesPerMonth[9] / totalSales * 100)}%`, value: salesPerMonth[9], color: '#E38627' },
            { title: `November: ${Math.round(salesPerMonth[10] / totalSales * 100)}%`, value: salesPerMonth[10], color: '#C13C37' },
            { title: `December: ${Math.round(salesPerMonth[11] / totalSales * 100)}%`, value: salesPerMonth[11], color: '#6A2135' },
        ]
        /*
        popunjavanje novih podataka kada u lokalnoj bazi postoje podaci
        */
     /*   const [dataChart, setDataChart] = {
            labels: monthNames,
            datasets: [
                {
                    label: "sold",
                    data: [
                        Math.round(salesPerMonth[0] / totalSales * 100),
                        Math.round(salesPerMonth[1] / totalSales * 100),
                        Math.round(salesPerMonth[2] / totalSales * 100),
                        Math.round(salesPerMonth[3] / totalSales * 100),
                        Math.round(salesPerMonth[4] / totalSales * 100),
                        Math.round(salesPerMonth[5] / totalSales * 100),
                        Math.round(salesPerMonth[6] / totalSales * 100),
                        Math.round(salesPerMonth[7] / totalSales * 100),
                        Math.round(salesPerMonth[8] / totalSales * 100),
                        Math.round(salesPerMonth[9] / totalSales * 100),
                        Math.round(salesPerMonth[10] / totalSales * 100),
                        Math.round(salesPerMonth[11] / totalSales * 100)
                    ],
                    backgroundColor: [
                        "rgba(75,192,192,1)",
                        "#ecf0f1",
                        "#50AF95",
                        "#f3ba2f",
                        "#2a71d0",
                    ],
                    borderColor: "black",
                    borderWidth: 2,
                },
            ],
        };
        setDataForChartPage(dataChart) 
        console.log(newDataForPage) */

        console.log(newDataForPage);
        setDataForPage(newDataForPage);

        setNoviData(newNoviData)

    };
    const downloadTxtFile = (data, columnNameArray) => {
        /* const data = "p,a,b\n1,2,3";*/

        const csvString = [
            [
                "Month Name",
                "Total Sales",
                "Total Revenue",
                "Percentage"

            ],
            ...data.map(item => [
                item.monthName,
                item.totalSales,
                item.totalRevenue,
                item.percentage
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
        element.download = "productReport.csv";
        document.body.appendChild(element);
        element.click();
    };

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    useEffect(async () => {
        

       const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/OrderModels/shoptopdfImport`);
       const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/OrderModels/shoptopdfExport`);
      
       
        const dataResponse = await response.json()
        const dataResponse2 = await response2.json()
        setData(dataResponse)
        console.log(dataResponse)
        setData2(dataResponse2)

        setDataForPage([{"monthName":"Month name", "totalSales":0, "totalRevenue":0, "percentage":0}])
        console.log(dataResponse);
        console.log("#")

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

  
    }, [])

    const handleChange = (e) => {
        setSelectedStore(e.target.value)
    }

   

    return (<>

        {data && allShops && dataForPage &&
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
                    Select shop and product you want information of
                    <div>
                        Shop name:
                    </div>
                    <select id="role" onChange={handleChange}>
                        <option value="Choose a shop">Choose a shop</option>
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

                </div>
                <Button title="Export Excel" onClick={applyFilter}>
                    Apply filter
                </Button>
                {isActive.current && <>  
            <div className="mainDiv">
                    <Button title="Export Excel" onClick={() => downloadTxtFile(dataForPage, [ "monthName", "totalSales", "totalRevenue", "percentage"])}>
                        Export to Excel
                    </Button>

                    <Grid
                        data={dataForPage}


                        style={{
                            height: '420px'
                        }} >

                    <GridColumn field="monthName" title="Month Name" width="250px"/>
                    <GridColumn field="totalSales" title="Total Sales" width="250px"/>
                    <GridColumn field="totalRevenue" title="Total Revenue" width="250px"  />
                    <GridColumn field="percentage" title="Percentage (%)"  />
                </Grid>
            
            </div>
            <div>
                <PieChart viewBox={[10, 10]} radius={25}
                    data={noviData}
                />
            </div>
            </>}
                </Box>
            
        }{
            !data && <h1>Loading...</h1>
        }
    </>);

};

/*<div>
    <PieChart data={dataForChartPage} />
</div> 
dodati ispod grida
 varijable za generisanje charta su dataForChartPage i dataChart i zakomentarisane su
 jer onda prikazivanje tabele ne radi kad su odkomentarisane
  za slucaj da ne uspijete napravit, vratite kod u ovo stanje, jer ovo prikazuje prodaju proizvoda po mjesecima bez prikaza chart-a
 */