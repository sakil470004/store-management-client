import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddMedicineDetails from './AddMedicineDetaild/AddMedicineDetails';
import AddIcon from '@mui/icons-material/Add';
import UpdateMedicineDetails from './UpdateMedicineDetails/UpdateMedicineDetails';



export default function Inventory({ isLoading, setIsLoading }) {
    const [carts, setCarts] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleOpenU = (data) => {
        setCurrentMedicine(data)
        setOpenU(true)

    };
    const [open, setOpen] = React.useState(false);
    const [openU, setOpenU] = React.useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [currentMedicine, setCurrentMedicine] = useState({})


    const handleRemove = id => {
        if (window.confirm("Are You Sure Want to Delete") === true) {

            const url = `https://storemanagementserver.herokuapp.com/medicine/${id}`;
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
        fetch('https://storemanagementserver.herokuapp.com/medicine')
            .then(res => res.json())
            .then(data => {
                setCarts(data)
                setIsLoading(false)
            })

    }, [isChanged, setCurrentMedicine,setIsLoading])


    return <div>
        <h2>Inventory</h2>
        <div style={{ display: 'flex', justifyContent: 'left', marginBottom: 15 }}>
            <Button startIcon={<AddIcon />} onClick={handleOpen}>Add New Medicine</Button>
        </div>
        <AddMedicineDetails
            setOpen={setOpen}
            open={open}
            isChanged={isChanged}
            setIsChanged={setIsChanged}
        />
        <UpdateMedicineDetails
            setOpenU={setOpenU}
            openU={openU}
            isChanged={isChanged}
            setIsChanged={setIsChanged}
            data={currentMedicine}
        />

        {
            isLoading ?
                <CircularProgress/>
                :
                <TableContainer component={Paper}>
                    <Table sx={{}} aria-label="Appointments table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Medicine Name</TableCell>
                                <TableCell>Manufacturer</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell align="right">Stock</TableCell>
                                <TableCell align="right">Discount(%)</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {carts.map((row) => (


                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.medicineName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.manufacturer}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.price}
                                    </TableCell>
                                    <TableCell align="right">{row.stock}</TableCell>
                                    <TableCell align="right">{row.discount}</TableCell>
                                    <TableCell align="right">


                                        <Button onClick={() => handleOpenU(row)}><CreateIcon /></Button>
                                        <Button onClick={() => handleRemove(row._id)} style={{ color: 'red' }}><DeleteIcon /></Button></TableCell>


                                </TableRow>


                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </div>;
}