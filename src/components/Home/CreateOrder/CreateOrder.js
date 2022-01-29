import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import ButtonGroupCustom from './ButtonGroupCustom';

export default function CreateOrder({ userName }) {

    const [order, setOrder] = useState({})
    const form = useRef(null)
    const [medicineDetails, setMedicineDetails] = useState([])

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newOrderData = { ...order };
        newOrderData[field] = value;
        setOrder(newOrderData)

    }
    const handleCreateOrder = (e) => {
        // console.log(product)
        // send data to the server


        e.preventDefault()
    }

    useEffect(() => {
        fetch('http://localhost:5000/medicine')
        .then(res => res.json())
        .then(data => setMedicineDetails(data))
    }, [])

    return <div>
        <h1>Crate Order</h1>

        <form
            ref={form}
            onSubmit={handleCreateOrder}>

            {/* 
            <TextField
                required
                sx={{ width: '50%', m: 2 }}
                label="Medicine Name"
                variant="standard"
                name='medicineName'
                onBlur={handleOnBlur} /> */}

            <ButtonGroupCustom 
                medicineDetails={medicineDetails}
            style={{ width: '50%' }} />
            <TextField
                required
                sx={{ width: '74%', m: 2 }}
                label="Medicine Quantity"
                variant="standard"
                name='medicineQuantity'
                type='number'
                onBlur={handleOnBlur} />

            <TextField
                required
                sx={{ width: '74%', m: 2 }}
                label="customer Name"
                variant="standard"
                name='customerName'
                onBlur={handleOnBlur} />
            <TextField
                required
                sx={{ width: '74%', m: 2 }}
                label="customer Contact Number"
                variant="standard"
                name='contactNumber'
                onBlur={handleOnBlur} />



            <h2>Order Details</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <TableContainer sx={{ width: "74%" }} component={Paper}>
                    <Table sx={{}} aria-label="Appointments table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Medicine Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell align="right">Price(Per Unite)</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow

                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    test1
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    test2
                                </TableCell>
                                <TableCell align="right">test3</TableCell>


                            </TableRow>
                            <TableRow

                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Total:
                                </TableCell>
                                <TableCell component="th" scope="row">

                                </TableCell>
                                <TableCell align="right">0</TableCell>


                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <button

                style={{ marginTop: 20, width: '74%', backgroundColor: '#1976D2', color: 'white', padding: '10px', borderRadius: '15px', cursor: 'pointer' }} type='submit'>Create Order</button>





        </form>
    </div>;
} 
