import React, { Component, useEffect, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table'
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"
import './OrdersStyle.css'


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
            initialState: { pageIndex: 0},
        },
        useSortBy,
        usePagination
    )

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

    const [lowPrice, setLowPrice] = useState(0);

    const [highPrice, setHighPrice] = useState(0);

    const [namme, setNamme] = useState("");

    const [shoppName, setShoppName] = useState("");

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
        console.log(data)
        setOrders(data)
        setFiltOrders(data)

        setLowPrice(0)
        setHighPrice(9999)

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
                    Header: 'Total',
                    accessor: 'total',
                    Cell: props => <div> {props.value + " KM"} </div>
                }
        ],
        []
    )

    function nameFilter(e) {
        var name = e.target.value;
        console.log(name);
        setNamme(name);
        console.log("Ime Shopa je : " + shoppName);
        if (shoppName != "")
            setFiltOrders(filtOrders.filter(x => x.productName.toLowerCase().includes(name.toLowerCase())));
        else setFiltOrders(orders.filter(x => x.productName.toLowerCase().includes(name.toLowerCase())));
    }

    function dateFilter(e) {
        /* problem sa date TIME! */
    }

    function categoryFilter(e) {
        var category = e.target.value;
        console.log(category);
        setFiltOrders(orders.filter(x => x.categoryName.includes(category.toString())));
    }

    function shopNameFilter(e) {
        var shop = e.target.value;
        console.log(shop);
        setShoppName(shop);
        console.log("Ime proizvoda je : " + namme);
        if (namme != "")
            setFiltOrders(filtOrders.filter(x => x.shopName.toLowerCase().includes(shop.toLowerCase())));
        else setFiltOrders(orders.filter(x => x.shopName.toLowerCase().includes(shop.toLowerCase())));
    }

    function priceFilterMin(e) {
        setLowPrice(e.target.value);
    }
    function priceFilterMax(e) {
        setHighPrice(e.target.value);
    }

    function priceFiltering() {
        console.log("Low: " + lowPrice);
        console.log("High: " + highPrice);
        var temp = orders.filter(x => x.total >= lowPrice);
        setFiltOrders(temp.filter(y => y.total <= highPrice));
    }

    return (
        <>
            <h1>Orders</h1>
            <div class="mainDiv">
                <div class="mainFilterDiv">
                    <div id="hiddenFilterDiv">
                        <div id="insideHiddenFilterDiv">
                            <div>
                                <label for="date">Filter by date&nbsp;</label>
                                <input type="date" name="date" id="date" onChange={dateFilter}></input>
                            </div>
                            <div>
                                <label for="name">Filter by name&nbsp;</label>
                                <input type="text" name="name" id="name" onChange={nameFilter}></input>
                            </div>
                            <div>
                                <label for="category">Category&nbsp;</label>
                                <select id="category" onChange={categoryFilter}>
                                    <option>Fruits and Vegetables</option>
                                </select>
                            </div>
                        </div>
                        <div id="insideHiddenFilterDiv2">
                            <div>
                                <label for="shop">Filter by shop&nbsp;</label>
                                <input type="text" name="shop" id="shop" onChange={shopNameFilter}></input>
                            </div>
                            <div>
                                <label>Filter by price (Total):&nbsp;&nbsp;&nbsp;</label>
                                <label for="priceLow">From&nbsp;</label>
                                <input type="number" name="priceLow" id="priceLow"
                                    onInput={priceFilterMin} onInput={priceFilterMin} value={lowPrice} onChange={priceFiltering}></input>
                                <label for="priceHigh">&nbsp;To&nbsp;</label>
                                <input type="number" name="priceHigh" id="priceHigh"
                                    onInput={priceFilterMax} onInput={priceFilterMax} value={highPrice} onChange={priceFiltering}></input>
                            </div>
                        </div>
                    </div>
                </div>
                <Table columns={columns} data={filtOrders} />
            </div>
        </>
    )
}

export default ShippedProducts

