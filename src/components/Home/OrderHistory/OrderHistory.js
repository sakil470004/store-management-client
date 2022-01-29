import { Button, CircularProgress,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function OrderHistory({ userName, isLoading, setIsLoading }) {
    const [carts, setCarts] = useState([]);

    const handleRemove = id => {
        if (window.confirm("Are You Sure Want to Delete") === true) {
            const url = `https://storemanagementserver.herokuapp.com/createOrder/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)

                    if (data.deletedCount) {
                        alert('Deleted')
                        const remaining = carts.filter(cart => cart._id !== id);
                        setCarts(remaining)
                    }
                })

        } else {
            alert('Deleted cancel')
        }
    }

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://storemanagementserver.herokuapp.com/createOrder/${userName}`)
            .then(res => res.json())
            .then(data => {
                setCarts(data)
                setIsLoading(false)
            })
    }, [userName,setIsLoading])
    return <div>
        <h2>My Order History</h2>
        {
            isLoading ?
                <CircularProgress />
                :
                <TableContainer component={Paper}>
                    <Table sx={{}} aria-label="Appointments table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order Id</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Medicine Name</TableCell>
                                <TableCell align="right">Contact</TableCell>

                                <TableCell align="right">Qty</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {carts.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row._id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.customerName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.medicineName}
                                    </TableCell>
                                    <TableCell align="right">{row.contactNumber}</TableCell>
                                    <TableCell align="right">{row.medicineQuantity}</TableCell>
                                    <TableCell align="right">{row.total}</TableCell>
                                    <TableCell align="right"><Button onClick={() => handleRemove(row._id)} style={{ color: 'red' }}><DeleteIcon /></Button></TableCell>

                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </div>;
}
