import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '50px',
    boxShadow: 24,
    p: 4,


};

export default function AddSalesExecutive({ open, setOpen, setIsChanged, isChanged }) {
    const handleClose = () => setOpen(false);
    const [salesExecutives, setSalesExecutives] = React.useState({})
    const form = React.useRef(null)

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newOrderData = { ...salesExecutives };
        newOrderData[field] = value;
        setSalesExecutives(newOrderData)

    }
    const handleCreateOrder = (e) => {
        // console.log(product)
        // send data to the server
        fetch('https://store-management--server.herokuapp.com/salesExecutives', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(salesExecutives)

        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    // alert('Medicine Added')
                    setIsChanged(!isChanged)
                    // form.current.reset();

                }
            })
        setOpen(false)

        e.preventDefault()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <h2>Add Sales Executives</h2>
                    <form
                        ref={form}
                        onSubmit={handleCreateOrder}>

                        <TextField
                            required
                            sx={{ width: '90%', m: 2 }}
                            label="First Name"
                            variant="standard"
                            name='firstName'
                            onBlur={handleOnBlur} />

                        <TextField
                            required
                            sx={{ width: '90%', m: 2 }}
                            label="Last Name"
                            variant="standard"
                            name='lastName'
                            onBlur={handleOnBlur} />
                        <TextField
                            required
                            sx={{ width: '40%', m: 2 }}
                            label="DOB(dd/mm/yyyy)"
                            variant="standard"
                            name='deathOfBirth'
                            onBlur={handleOnBlur} />

                        <TextField
                            required
                            sx={{ width: '40%', m: 2 }}
                            label="Gender(M/F/O)"
                            variant="standard"
                            name='gender'
                            onBlur={handleOnBlur} />

                        <TextField
                            required
                            sx={{ width: '90%', m: 2 }}
                            label="Experience(Year)"
                            variant="standard"
                            name='experience'
                            type='number'
                            onBlur={handleOnBlur} />


                        <button

                            style={{ marginTop: 20, width: '90%', backgroundColor: '#1976D2', color: 'white', padding: '10px', borderRadius: '15px', cursor: 'pointer' }} type='submit'>Add To The Team</button>

                    </form>
                </Box>
            </Modal>
        </div>
    );
}