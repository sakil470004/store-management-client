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

export default function AddMedicineDetails({ open, setOpen ,isChanged,setIsChanged}) {
    const handleClose = () => setOpen(false);
    const [medicine, setMedicine] = React.useState({})
    const form = React.useRef(null)

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newMedicineData = { ...medicine };
        newMedicineData[field] = value;
        setMedicine(newMedicineData)

    }
    const handleAddToInventory = (e) => {
        // send data to the server
        // console.log(medicine)
        fetch('https://storemanagementserver.herokuapp.com/medicine', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(medicine)

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

                    <h2>Add Medicine Details</h2>
                    <form
                        ref={form}
                        onSubmit={handleAddToInventory}>

                        <TextField
                            required
                            sx={{ width: '90%', m: 2 }}
                            label="Medicine Name"
                            variant="standard"
                            name='medicineName'
                            onBlur={handleOnBlur} />

                        <TextField
                            required
                            sx={{ width: '90%', m: 2 }}
                            label="Manufacturer"
                            variant="standard"
                            name='manufacturer'
                            onBlur={handleOnBlur} />
                        <TextField
                            required
                            sx={{ width: '40%', m: 2 }}
                            label="Price"
                            variant="standard"
                            name='price'
                            type='number'

                            onBlur={handleOnBlur} />

                        <TextField
                            required
                            sx={{ width: '40%', m: 2 }}
                            label="Stock"
                            variant="standard"
                            name='stock'
                            type='number'
                            onBlur={handleOnBlur} />

                        <TextField
                            required
                            sx={{ width: '40%', m: 2 }}
                            label="Discount(%)"
                            variant="standard"
                            name='discount'
                            type='number'
                            onBlur={handleOnBlur} />


                        <button

                            style={{ marginTop: 20, width: '90%', backgroundColor: '#1976D2', color: 'white', padding: '10px', borderRadius: '15px', cursor: 'pointer' }} type='submit'>Add To The Inventory</button>

                    </form>
                </Box>
            </Modal>
        </div>
    );
}