import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ButtonGroupCustom from './ButtonGroupCustom';

export default function CreateOrder({ userName }) {

    const [order, setOrder] = useState({})
    const form = useRef(null)
    const [medicineDetails, setMedicineDetails] = useState([])
    const [currentSelectedMedicine, setCurrentSelectedMedicine] = useState({})
    const [loading, setLoading] = useState(false);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newOrderData = { ...order };
        newOrderData[field] = value;
        setOrder(newOrderData)

    }
    const handleCreateOrder = (e) => {
        // send data to the server
        // create obj for send server
        setLoading(true)
        const orderDetails = { total: (order.medicineQuantity * currentSelectedMedicine.price), userName: userName, medicineName: currentSelectedMedicine.medicineName, ...order }
        // console.log(orderDetails)
        fetch('https://store-management-server-three.vercel.app/createOrder', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderDetails)

        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setLoading(false)
                    alert('Order Added')
                    form.current.reset();
                    // setCurrentSelectedMedicine({})



                }
            })

        e.preventDefault()
    }

    useEffect(() => {
        setLoading(true);
        fetch('https://store-management-server-three.vercel.app/medicine')
            .then(res => res.json())
            .then(data => {
                setMedicineDetails(data)
                setLoading(false)
            })
    }, [])

    return (
        loading ? <h1>Loading ...</h1> :
            <div>
                <h1>Crate Order</h1>

                <form
                    ref={form}
                    onSubmit={handleCreateOrder}>

                    <ButtonGroupCustom
                        required
                        medicineDetails={medicineDetails}
                        setCurrentSelectedMedicine={setCurrentSelectedMedicine}
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
                                            {currentSelectedMedicine.medicineName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {order.medicineQuantity}
                                        </TableCell>
                                        <TableCell align="right">{currentSelectedMedicine.price}</TableCell>


                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Total:
                                        </TableCell>
                                        <TableCell component="th" scope="row">

                                        </TableCell>
                                        <TableCell align="right">{(order?.medicineQuantity * currentSelectedMedicine?.price).toString()}</TableCell>


                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <button

                        style={{ marginTop: 20, width: '74%', backgroundColor: '#1976D2', color: 'white', padding: '10px', borderRadius: '15px', cursor: 'pointer' }} type='submit'>Create Order</button>





                </form>
            </div>)
} 
