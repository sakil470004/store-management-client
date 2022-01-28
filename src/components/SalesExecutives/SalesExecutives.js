import React, { useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddSalesExecutive from './AddSalesExecutive/AddSalesExecutive';
import AddIcon from '@mui/icons-material/Add';



export default function SalesExecutives() {
    const [carts, setCarts] = useState([]);
    const handleOpen = () => setOpen(true);
    const [open, setOpen] = React.useState(false);


    return <div>
        <h2>Sales Executives</h2>
        <div style={{display:'flex',justifyContent:'left',marginBottom:15}}>
            <Button startIcon={<AddIcon/>} onClick={handleOpen}>Add Sales Executive</Button>
        </div>
        <AddSalesExecutive
            setOpen={setOpen}
            open={open}
        />
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
                    {/* {carts.map((row) => ( */}
                    <TableRow
                        // key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            F name
                        </TableCell>
                        <TableCell component="th" scope="row">
                           L name
                        </TableCell>
                        <TableCell component="th" scope="row">
                            DoB
                        </TableCell>
                        <TableCell align="right">gender</TableCell>
                        <TableCell align="right">year</TableCell>
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