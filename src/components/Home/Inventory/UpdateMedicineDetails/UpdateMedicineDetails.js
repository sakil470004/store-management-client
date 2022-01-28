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

export default function UpdateMedicineDetails({ data, openU, setOpenU, isChanged, setIsChanged }) {
    const handleClose = () => setOpenU(false);
    const [medicine, setMedicine] = React.useState(data)
    const form = React.useRef(null)
    const { medicineName, manufacturer, price, stock, discount } = data;

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newMedicineData = { ...medicine };
        newMedicineData[field] = value;
        setMedicine(newMedicineData)


    }
    const handleUpdate = (e) => {
        // send data to the server

        const newMedicineData = { ...medicine, _id: data._id }
        fetch('http://localhost:5000/medicines', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newMedicineData)
        })
            .then(res => res.json())
            .then(data => {
             
                if (data.modifiedCount) {
                    alert('Medicine Updated')
                    setIsChanged(!isChanged)
                } else {
                    alert('something wrong')
                    console.log(data)
                }
                // empty input field
                // for name field need must and here name is email  

            })
        console.log(newMedicineData)
        form.current.reset();
        setMedicine({})

        setOpenU(false)

        e.preventDefault()
    }

    return (
        <div>
            <Modal
                open={openU}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <h2>Update Medicine Details</h2>
                    <form
                        ref={form}
                        onSubmit={handleUpdate}>

                        <TextField
                            required
                            sx={{ width: '90%', m: 2 }}
                            label="Medicine Name"
                            variant="standard"
                            name='medicineName'
                            defaultValue={medicineName}
                            onBlur={handleOnBlur} />

                        <TextField
                            required
                            sx={{ width: '90%', m: 2 }}
                            label="Manufacturer"
                            variant="standard"
                            defaultValue={manufacturer}
                            name='manufacturer'
                            onBlur={handleOnBlur} />
                        <TextField
                            required
                            sx={{ width: '40%', m: 2 }}
                            label="Price"
                            variant="standard"
                            name='price'
                            type='number'
                            defaultValue={price}
                            onBlur={handleOnBlur} />

                        <TextField
                            required
                            sx={{ width: '40%', m: 2 }}
                            label="Stock"
                            variant="standard"
                            name='stock'
                            type='number'
                            defaultValue={stock}
                            onBlur={handleOnBlur} />

                        <TextField
                            required
                            sx={{ width: '40%', m: 2 }}
                            label="Discount(%)"
                            variant="standard"
                            name='discount'
                            type='number'
                            defaultValue={discount}
                            onBlur={handleOnBlur} />


                        <button

                            style={{ marginTop: 20, width: '90%', backgroundColor: '#1976D2', color: 'white', padding: '10px', borderRadius: '15px', cursor: 'pointer' }} type='submit'>Update</button>

                    </form>
                </Box>
            </Modal>
        </div>
    );
}