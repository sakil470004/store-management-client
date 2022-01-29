import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddSalesExecutive from './AddSalesExecutive/AddSalesExecutive';
import AddIcon from '@mui/icons-material/Add';
import UpdateSalesExecutives from './UpdateSalesExecutives/UpdateSalesExecutives';



export default function SalesExecutives({ isLoading, setIsLoading }) {
    const [carts, setCarts] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleOpenU = (data) => {
        setCurrentSaleExecutive(data)
        setOpenU(true);

    }
    const [open, setOpen] = React.useState(false);
    const [openU, setOpenU] = React.useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [currentSaleExecutive, setCurrentSaleExecutive] = useState({})


    const handleRemove = id => {
        if (window.confirm("Are You Sure Want to Delete") === true) {

            const url = `https://storemanagementserver.herokuapp.com/salesExecutive/${id}`;
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
        fetch('https://storemanagementserver.herokuapp.com/salesExecutives')
            .then(res => res.json())
            .then(data => {
                setCarts(data)
                setIsLoading(false)
            })

    }, [isChanged,setIsLoading])

    return <div>
        <h2>Sales Executives</h2>
        <div style={{ display: 'flex', justifyContent: 'left', marginBottom: 15 }}>
            <Button startIcon={<AddIcon />} onClick={handleOpen}>Add Sales Executive</Button>
        </div>
        <AddSalesExecutive
            setOpen={setOpen}
            open={open}
            isChanged={isChanged}
            setIsChanged={setIsChanged}
        />
        <UpdateSalesExecutives
            setOpenU={setOpenU}
            openU={openU}
            isChanged={isChanged}
            setIsChanged={setIsChanged}
            data={currentSaleExecutive}
        />
            {
                    isLoading ?
                    <CircularProgress/>
                        :
        <TableContainer component={Paper}>
            <Table sx={{}} aria-label="Appointments table">
                <TableHead>
                    <TableRow>

                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>DOB</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">Experience(in Years)</TableCell>
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
                                {row.firstName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.lastName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.deathOfBirth}
                            </TableCell>
                            <TableCell align="right">{row.gender}</TableCell>
                            <TableCell align="right">{row.experience}</TableCell>
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