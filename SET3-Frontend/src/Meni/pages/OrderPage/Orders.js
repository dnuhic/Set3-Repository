import React, { Component, useEffect, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table'
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"
import './OrdersStyle.css'
import Box from '@mui/material/Box';


function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5},
        },
        useSortBy,
        usePagination
    )

    function handleFilterButtonClickRT() {
        var filterDiv = document.getElementById("hiddenFilterDivRT")
        if (filterDiv.style.display == 'flex')
            filterDiv.style.display = 'none'
        else
            filterDiv.style.display = 'flex'
    }

    function handleFilterButtonClick() {
        var filterDiv = document.getElementById("hiddenFilterDiv")
        if (filterDiv.style.display == 'flex')
            filterDiv.style.display = 'none'
        else
            filterDiv.style.display = 'flex'
    }

    return (
        <>
            <div class="filterDiv">
                <div>
                    Show&nbsp;
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 15, 20].map(pageSize => (
                            <option key={pageSize} value={pageSize}>{pageSize}
                            </option>
                        ))}
                    </select>
                    &nbsp;entires
                </div>
                <div>
                    <button onClick={handleFilterButtonClickRT}>
                        <img src={require("./filter2.png")} alt="filter icon" width="23" height="23"></img>
                    </button>
                    <button onClick={handleFilterButtonClick}>
                        <img src={require("./filter.png")} alt="filter icon" width="25" height="25"></img>
                    </button>
                </div>
            </div>
            <table class="orderTable" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? <img src={require("./arrowDown.png")} alt="arrowDown" width="15" height="15"></img>
                                                : <img src={require("./arrowUp.png")} alt="arrowDown" width="15" height="15"></img>
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'Previous'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'Next'}
                </button>{' '}
            </div>
        </>
    )
}

function ShippedProducts() {

    const navigate = useNavigate()

    const [orders, setOrders] = useState([])

    const [filtOrders, setFiltOrders] = useState([])

    const [helpfulOrders, setHelpfulOrders] = useState([])

    const [lowPrice, setLowPrice] = useState(0);

    const [highPrice, setHighPrice] = useState(0);

    const [namme, setNamme] = useState("");

    const [shoppName, setShoppName] = useState("");

    const [categories, setCategories] = useState([]);

    const [unitOfMeasurement, setUnitOfMeasurement] = useState([]);

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    useEffect(async () => {
        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/ordermodels/orderInfo`, requestOptions);
        ResponseCheckModule.unauthorizedResponseCheck(response, navigate)
        var data = await response.json()

        const responseCategory = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/CategoryModels`, requestOptions);
        ResponseCheckModule.unauthorizedResponseCheck(responseCategory, navigate)
        var dataCategory = await responseCategory.json()

        const responseUnitOfMeasurement = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/MeasuringUnits`, requestOptions);
        ResponseCheckModule.unauthorizedResponseCheck(responseCategory, navigate)
        var dataUnitOfMeasurement = await responseUnitOfMeasurement.json()

        console.log(data)
        setOrders(data)
        setFiltOrders(data)
        setHelpfulOrders(data)

        setCategories(dataCategory)
        setUnitOfMeasurement(dataUnitOfMeasurement)

        setLowPrice(0)
        setHighPrice(10000)

    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Order ID',
                accessor: 'orderId',
            },
            {
                Header: 'Name',
                accessor: 'productName',
            },
            {
                Header: 'Category',
                accessor: 'categoryName',
            },
            {
                Header: 'Shop',
                accessor: 'shopName',
            },
            {
                Header: 'Price',
                accessor: 'price',
                Cell: props => <div> {props.value + " KM"} </div>
            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
            },
            {
                Header: 'Unit of measurement',
                accessor: 'unitOfMeasurement',
            },
            {
                Header: 'Total',
                accessor: 'total',
                Cell: props => <div> {props.value + " KM"} </div>
            }
        ],
        []
    )

    function nameFilter(e) {
        var name = e.target.value;
        setNamme(name);
        if (shoppName != "")
            setFiltOrders(helpfulOrders.filter(x => x.productName.toLowerCase().includes(name.toLowerCase())));
        else {
            setFiltOrders(orders.filter(x => x.productName.toLowerCase().includes(name.toLowerCase())));
            setHelpfulOrders(filtOrders);
        }
        clearFiltersFunction1();
    }

    function shopNameFilter(e) {
        var shop = e.target.value;
        setShoppName(shop);
        if (namme != "")
            setFiltOrders(helpfulOrders.filter(x => x.shopName.toLowerCase().includes(shop.toLowerCase())));
        else {
            setFiltOrders(orders.filter(x => x.shopName.toLowerCase().includes(shop.toLowerCase())));
            setHelpfulOrders(filtOrders)
        }
        clearFiltersFunction1();
    }

    function applyFiltersFunction() {
        var list = orders;
        var low = document.getElementById("priceLow").value;
        var high = document.getElementById("priceHigh").value;
        var catIndex = document.getElementById("category").selectedIndex;
        var cat = document.getElementById("category")[catIndex].value;
        var startDate = new Date(document.getElementById("startDate").value);
        var endDate = new Date(document.getElementById("endDate").value);
        var name = document.getElementById("name").value;
        var shop = document.getElementById("shop").value;

        if (low == "") low = 0;
        if (high == "") high = 10000;
        if (cat != "")
            list = list.filter(x => x.categoryName.toLowerCase().includes(cat.toLowerCase()));
        list = list.filter(x => x.total >= low && x.total <= high);
        if (!(startDate == "Invalid Date" && endDate == "Invalid Date"))
            list = list.filter(x => new Date(x.date) >= startDate && new Date(x.date) <= endDate);
        /*
        if (!(startDate == "Invalid Date" && endDate != "Invalid Date"))
            list = list.filter(x => new Date(x.date) <= endDate);
        if (!(endDate == "Invalid Date" && startDate != "Invalid Date"))
            list = list.filter(x => new Date(x.date) >= startDate);
        */

        if (name != "")
            list = list.filter(x => x.productName.toLowerCase().includes(name.toLowerCase()));
        if (shop != "")
            list = list.filter(x => x.shopName.toLowerCase().includes(shop.toLowerCase()));

        setFiltOrders(list);

    }

    function clearFiltersFunction() {
        setFiltOrders(orders);
        document.getElementById("name").value = "";
        document.getElementById("shop").value = "";
        document.getElementById("startDate").value = "";
        document.getElementById("endDate").value = "";
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("priceLow").value = 0;
        document.getElementById("priceHigh").value = 10000;
    }

    function clearFiltersFunction1() {
        document.getElementById("startDate").value = "";
        document.getElementById("endDate").value = "";
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("priceLow").value = 0;
        document.getElementById("priceHigh").value = 10000;
    }

    return (
        <Box sx={{
            width: '70%',
            padding: '20px',
            height: '40%',
            bgcolor: '#a8c0c0',
            boxShadow: 16,
            borderRadius: '0 0 20px 20px',
            position: 'relative',
            overflow: 'auto',
            margin: 'auto'
        }}>
            <h1>Orders</h1>
            <div class="mainDiv">
                <div class="mainFilterDiv">
                    <div id="hiddenFilterDivRT">
                        <div>
                            <label for="name">Filter by name&nbsp;</label>
                            <input type="text" name="name" id="name" onChange={nameFilter}></input>
                        </div>
                        <div>
                            <label for="shop">Filter by shop&nbsp;</label>
                            <input type="text" name="shop" id="shop" onChange={shopNameFilter}></input>
                        </div>
                    </div>
                    <div id="hiddenFilterDiv">
                        <div id="insideHiddenFilterDiv">

                            <div>
                                <label for="startDate">Filter by date:&nbsp;&nbsp; From&nbsp;</label>
                                <input type="date" name="date" id="startDate"></input>
                                <label for="endDate">&nbsp;To&nbsp;</label>
                                <input type="date" name="date" id="endDate"></input>
                            </div>
                                <div>
                                    <label for="category">Category&nbsp;</label>
                                    <select id="category">
                                        <option></option>
                                        {categories.map(x => <option>{x.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                <label for="unitOfMeasurement">Unit Of Measurement&nbsp;</label>
                                <select id="unitOfMeasurement">
                                        <option></option>
                                    {unitOfMeasurement.map(x => <option>{x.measuringUnitName}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label>Filter by price (Total):&nbsp;&nbsp;&nbsp;</label>
                                    <label for="priceLow">From&nbsp;</label>
                                    <input type="number" name="priceLow" id="priceLow"
                                    min={0} max={10000} ></input>
                                    <label for="priceHigh">&nbsp;To&nbsp;</label>
                                    <input type="number" name="priceHigh" id="priceHigh"
                                    min={0} max={10000} ></input>
                                </div>
                        </div>
                        <div id="insideHiddenFilterDiv2">
                            <button onClick={applyFiltersFunction}>
                                {'Apply'}
                            </button>
                            <button onClick={clearFiltersFunction}>
                                {'Clear'}
                            </button>
                        </div>
                    </div>
                </div>
                <Table columns={columns} data={filtOrders} />
            </div>
        </Box>
    )
}

export default ShippedProducts

