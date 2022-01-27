import React, { useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';



export default function Inventory() {
    const [carts, setCarts] = useState([]);
    return <div>
        <h2>Inventory</h2>
        <TableContainer component={Paper}>
            <Table sx={{}} aria-label="Appointments table">
                <TableHead>
                    <TableRow>
                        <TableCell>Medicine Name</TableCell>
                        <TableCell>Manufacturer</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell align="right">Stock</TableCell>
                        <TableCell align="right">Discount(%)</TableCell>
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
                            M name
                        </TableCell>
                        <TableCell component="th" scope="row">
                            manufacture
                        </TableCell>
                        <TableCell component="th" scope="row">
                            price
                        </TableCell>
                        <TableCell align="right">stock</TableCell>
                        <TableCell align="right">discount</TableCell>
                        <TableCell align="right">
                        <Button><CreateIcon /></Button>
                        <Button style={{ color: 'red' }}><DeleteIcon /></Button></TableCell>

                    </TableRow>
                    {/* ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    </div>;
}