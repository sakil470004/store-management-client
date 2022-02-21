import * as React from 'react';
import Box from '@mui/material/Box';
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

export default function UpdateSalesExecutives({ data, openU, setOpenU, isChanged, setIsChanged }) {
    const handleClose = () => setOpenU(false);
    const [salesExecutive, setSalesExecutive] = React.useState(data)
    const form = React.useRef(null)
    const { firstName, lastName, deathOfBirth, gender, experience } = data;

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newSalesExecutive = { ...salesExecutive };
        newSalesExecutive[field] = value;
        setSalesExecutive(newSalesExecutive)


    }
    const handleUpdate = (e) => {
        // send data to the server

        const newSalesExecutive = { ...salesExecutive, _id: data._id }
        fetch('https://store-management--server.herokuapp.com/salesExecutive', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newSalesExecutive)
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount) {
                    alert('Sales Updated')
                    setIsChanged(!isChanged)
                } else {
                    alert('something wrong')
                    console.log(data)
                }
                // empty input field
                // for name field need must and here name is email  

            })
        console.log(newSalesExecutive)
        form.current.reset();
        setSalesExecutive({})

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

                    <h2>Update SalesExecutive Details</h2>
                    <form
                        ref={form}
                        onSubmit={handleUpdate}>

                        <TextField
                            required
                            sx={{ width: '90%', m: 2 }}
                            label="First Name"
                            variant="standard"
                            name='firstName'
                            defaultValue={firstName}
                            onBlur={handleOnBlur} />

                        <TextField
                            required
                            sx={{ width: '90%', m: 2 }}
                            label="Last Name"
                            defaultValue={lastName}
                            variant="standard"
                            name='lastName'
                            onBlur={handleOnBlur} />
                        <TextField
                            required
                            sx={{ width: '40%', m: 2 }}
                            label="DOB(dd/mm/yyyy)"
                            defaultValue={deathOfBirth}
                            variant="standard"
                            name='deathOfBirth'
                            onBlur={handleOnBlur} />

                        <TextField
                            required
                            sx={{ width: '40%', m: 2 }}
                            label="Gender(M/F/O)"
                            variant="standard"
                            defaultValue={gender}
                            name='gender'
                            onBlur={handleOnBlur} />

                        <TextField
                            required
                            sx={{ width: '90%', m: 2 }}
                            label="Experience(Year)"
                            variant="standard"
                            defaultValue={experience}
                            name='experience'                          type='number'
                            onBlur={handleOnBlur} />


                        <button

                            style={{ marginTop: 20, width: '90%', backgroundColor: '#1976D2', color: 'white', padding: '10px', borderRadius: '15px', cursor: 'pointer' }} type='submit'>Update</button>

                    </form>
                </Box>
            </Modal>
        </div>
    );
}