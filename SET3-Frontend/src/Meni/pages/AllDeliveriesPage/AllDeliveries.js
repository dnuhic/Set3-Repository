import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import "bootstrap/dist/css/bootstrap.css"
import DeliveriesTable from './DeliveriesTable';

export default function AllDeliveries() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [orderBy, setOrderBy] = React.useState(1);
    const [data, setData] = React.useState(TESTDATA)

    React.useEffect(() => {
        getFilteredData(); // CHANGE THE FUNCTION getFilteredData
    }, [page, rowsPerPage, orderBy]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    let orderByArray = [
        {
            id: 1,
            description:"Date Ascending"
        },
        {
            id: 2,
            description: "Date Descending"
        },
    ]
    const handleChangeOrder = (e) => {
        setOrderBy(e.target.value);
    }

    function getFilteredData() {
        //This function gets called whenever page, rowsPerPag & OrderBy gets changed 
        //CHANGE THIS FUNCTION TO WORK WITH BACKEND 
        let startIndex = (page) * rowsPerPage;
        let endIndex = startIndex + rowsPerPage;
        let newData = TESTDATA.slice(startIndex, endIndex);

        setData(newData);
    }
    return (
        <>
            <div className="col my-auto">
                <h1>Deliveries:</h1>
            </div>
            <div className="col mb-3">
            </div>
            <div className="row mx-3 align-items-center justify-content-end">
                <div className="col-12 col-md-6 my-auto">
                    <TablePagination
                        component="div"
                        count={TESTDATA.length} // number of orders in DB 
                        page={page} //current page number
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}

                    />
                </div>
                <div className="col-6 col-md-2">
                    <select id="role" onChange={handleChangeOrder}>
                        {orderByArray.map(e => <option key={ e.id} value={e.id}>{e.description}</option>)}
                    </select>
                </div>
                
                
            </div>
            
            <DeliveriesTable data={data} />
            
        </>
    );

}

const TESTDATA = [
    {
        id: 1,
        shopId: 1,
        date: "2022-04-10T13:45:30",
        name: "iPhone X 64GB grey",
        price: "$999.99",
        quantity: 3
    },
    {
        id: 2,
        shopId: 1,
        date: "2022-04-10T13:45:30",
        name: "iPhone X 64GB grey",
        price: "$999.99",
        quantity: 2
    },
    {
        id: 3,
        shopId: 1,
        date: "2022-04-10T13:45:30",
        name: "iPhone X 64GB grey",
        price: "$999.99",
        quantity: 1
    },
    {
        id: 4,
        shopId: 1,
        date: "2022-04-10T13:45:30",
        name: "iPhone X 64GB grey",
        price: "$999.99",
        quantity: 1
    },
    {
        id: 5,
        shopId: 1,
        date: "2022-04-10T13:45:30",
        name: "iPhone X 64GB grey",
        price: "$999.99",
        quantity: 1
    },
    {
        id: 6,
        shopId: 1,
        date: "2022-04-10T13:45:30",
        name: "iPhone X 64GB grey",
        price: "$999.99",
        quantity: 1
    }, {
        id: 7,
        shopId: 1,
        date: "2022-04-10T13:45:30",
        name: "iPhone X 64GB grey",
        price: "$999.99",
        quantity: 1
    },
    {
        id: 8,
        shopId: 1,
        date: "2022-04-10T13:45:30",
        name: "iPhone X 64GB grey",
        price: "$999.99",
        quantity: 1
    },
    {
        id: 9,
        shopId: 1,
        date: "2022-04-10T13:45:30",
        name: "iPhone X 64GB grey",
        price: "$999.99",
        quantity: 1
    },
    {
        id: 10,
        shopId: 1,
        date: "2022-04-10T13:45:30",
        name: "iPhone X 64GB grey",
        price: "$999.99",
        quantity: 1
    },
    {
        id: 11,
        shopId: 1,
        date: "2022-04-10T13:45:30",
        name: "iPhone X 64GB grey",
        price: "$999.99",
        quantity: 1
    },
    {
        id: 1,
        shopId: 1,
        date: "2022-04-10T13:45:30",
        name: "iPhone X 64GB grey",
        price: "$999.99",
        quantity: 1
    },
    
]