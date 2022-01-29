import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, InputLabel, Snackbar } from '@mui/material';

export default function ButtonGroupCustom({ action, medicineDetails }) {
  const [newAction, setNewAction] = React.useState(action);
  // snackbar code
  // const [open, setOpen] = React.useState(false);



  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };
  // end of snackbar code

  const handleChange = (event) => {
    // update action
    // setNewAction(event.target.value);
    // const user = { id, action: event.target.value }
    // // console.log(event.target.value)
    // fetch('https://mobile-dokan-server.herokuapp.com/carts/action', {
    //   method: 'PUT',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(user)
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     // console.log(data);
    //     if (data.modifiedCount) {
    //       // alert('Action Changed')
    //       // setDataObserver(!dataObserver)
    //       handleClick()
    //     } else {
    //       alert('Something wrong when Action Changed')

    //     }
    //   })


  };



  return (
    <div >
      <FormControl sx={{ m: 1, width: "75%" }}>
        <InputLabel id="demo-simple-select-autowidth-label">Medicine Name
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={newAction}
          onChange={handleChange}
          label="Age"
        >

          {medicineDetails.map(mD =>
            < MenuItem value='pending'>{mD.medicineName}</MenuItem>
          )
          }
          {/* <MenuItem value='pending'>Pending</MenuItem>
          <MenuItem value='done'>Done</MenuItem>
          <MenuItem value='ongoing'>On Going</MenuItem> */}
        </Select>
      </FormControl>
      {/* snackbar code */}
      {/* <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Action Changed
        </Alert>
      </Snackbar> */}
      {/* end of snackbar code */}
    </div>
  );
}
