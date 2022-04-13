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
            initialState: { pageIndex: 0, pageSize: 1 },
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
                        {[1, 2, 3, 4].map(pageSize => (
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

    function test(e) {
        console.log(e.target.value)
        setOrders(orders.filter(order => order.orderId + "" == e.target.value))
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
                                <input type="date" name="date" id="date"></input>
                            </div>
                            <div>
                                <label for="name">Filter by name&nbsp;</label>
                                <input type="text" name="name" id="name" onChange={ test}></input>
                            </div>
                            <div>
                                <label for="category">Category&nbsp;</label>
                                <select id="category">
                                    <option>Fruits and Vegetables</option>
                                </select>
                            </div>
                        </div>
                        <div id="insideHiddenFilterDiv2">
                            <div>
                                <label for="shop">Filter by shop&nbsp;</label>
                                <input type="text" name="shop" id="shop"></input>
                            </div>
                            <div>
                                <label>Filter by price (Total):&nbsp;&nbsp;&nbsp;</label>
                                <label for="priceLow">From&nbsp;</label>
                                <input type="number" name="priceLow" id="priceLow"></input>
                                <label for="priceHigh">&nbsp;To&nbsp;</label>
                                <input type="number" name="priceHigh" id="priceHigh"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <Table columns={columns} data={orders} />
            </div>
        </>
    )
}

export default ShippedProducts

