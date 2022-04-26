import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './DeliveriesStyle.css';


const getTotalPrice = function (price, quantity) {
    var number = Number(price.replace(/[^0-9\.]+/g, ""));
    number = Math.round(quantity * number * 100) / 100;
    console.log("price " +number);
    return '$'.concat('', (number).toString());
}

export default function DeliveriesTable(props) {

    const { data } = props;

    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const handleClose = () => {
        setOpen(false);
        setSelectedRow(null);
    };

    const TRIM_LENGTH = 20;
    let trimString = function (string) {
        return string.length > TRIM_LENGTH ?
            string.substring(0, TRIM_LENGTH) + '...' :
            string;
    };

    const handleModalOpen = (row) => {
        setSelectedRow(row);
        console.log(selectedRow)
        setOpen(true);
    }

    return (
        <>
            <div className="card mx-3">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Unit of measurement</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(row =>
                                <tr key={row.id} onClick={() => handleModalOpen(row)}>
                                    <td>{row.date}</td>
                                    <td>{trimString(row.name)}</td>
                                    <td>{row.price}</td>
                                    <td>{row.quantity}</td>
                                    <td>{row.measuringUnit}</td>
                                    <td>{getTotalPrice(row.price, row.quantity)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
           </div>
           <ModalRowView open={open} onClose={handleClose} row={selectedRow} />
        </>
        )
}

function ModalRowView(props) {
    const { onClose, open, row} = props;

    const handleClose = () => {
        onClose();
    }

    if (!row) return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Error</DialogTitle>
                <DialogActions>
                    <button onClick={handleClose}>Close</button>
                </DialogActions>
            </Dialog>
        </>
        )
    return (
        
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Order on date {row.date}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        On date: {row.date}
                    </DialogContentText>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        Product: {row.name}
                    </DialogContentText>
                    <DialogContentText
                        id="scroll-dialog-price"
                        tabIndex={-1}
                    >
                        Price: {row.price}
                    </DialogContentText>
                    <DialogContentText
                        id="scroll-dialog-quantity"
                        tabIndex={-1}
                    >
                        Quantity: {row.quantity}
                    </DialogContentText>
                    <DialogContentText
                        id="scroll-dialog-"
                        tabIndex={-1}
                    >
                        MeasuringUnit: {row.measuringUnit}
                    </DialogContentText>
                    <DialogContentText
                        id="scroll-dialog-total"
                        tabIndex={-1}
                    >
                        Total: {getTotalPrice(row.price, row.quantity)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Close</button>
                </DialogActions>
            </Dialog>
        </div>
        )
}