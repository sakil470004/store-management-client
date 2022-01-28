import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AllOrder() {
    const [carts, setCarts] = useState([]);

    return <div>
        <h2>All Order History </h2>
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
                    {/* {carts.map((row) => ( */}
                        <TableRow
                            // key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                id
                            </TableCell>
                            <TableCell component="th" scope="row">
                                customerName
                            </TableCell>
                            <TableCell component="th" scope="row">
                                medicineName
                            </TableCell>
                            <TableCell align="right">contact</TableCell>
                            <TableCell align="right">qty</TableCell>
                            <TableCell align="right">total</TableCell>
                            <TableCell align="right"><Button style={{color:'red'}}><DeleteIcon/></Button></TableCell>

                        </TableRow>
                    {/* ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    </div>;
}
