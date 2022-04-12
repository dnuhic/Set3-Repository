import React from "react";
import '../styleForm.css';
import { useTable, useSortBy } from 'react-table'
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )

    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    const firstPageRows = rows.slice(0, 20)

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? 'V'
                                                : 'A'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map(
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
            <br />
            <div>Showing the first 20 results of {rows.length} rows</div>
        </>
    )
}

function ShippedProducts() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Age',
                        accessor: 'age',
                    },
                    {
                        Header: 'Visits',
                        accessor: 'visits',
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                    },
                    {
                        Header: 'Profile Progress',
                        accessor: 'progress',
                    },
                ],
            },
        ],
        []
    )

    const data = [
        {
            firstName: "Kate",
            lastName: "Katey",
            age: 22,
            visits: 62,
            status: "complicated",
            progress: 91
        },
        {
            firstName: "Kate1",
            lastName: "Katey",
            age: 22,
            visits: 62,
            status: "relationship",
            progress: 100
        },
        {
            firstName: "Kate2",
            lastName: "Katey",
            age: 22,
            visits: 62,
            status: "single",
            progress: 91
        },
        {
            firstName: "Kate3",
            lastName: "Katey",
            age: 26,
            visits: 22,
            status: "complicated",
            progress: 31
        },
        {
            firstName: "Kate4",
            lastName: "Katey",
            age: 18,
            visits: 13,
            status: "single",
            progress: 123
        }

    ];

    return (

        <Table columns={columns} data={data} />

    )
}

export default ShippedProducts

