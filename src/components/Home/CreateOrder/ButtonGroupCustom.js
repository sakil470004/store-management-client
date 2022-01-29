import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, InputLabel, Snackbar } from '@mui/material';

export default function ButtonGroupCustom({ medicineDetails, setCurrentSelectedMedicine }) {
  const [selectButton, setSelectButton] = React.useState('')

 

  const handleChange = (event) => {
    const currentMedicineId = event.target.value;

    const selectedMed = medicineDetails.find(mD => currentMedicineId == mD._id)
    setCurrentSelectedMedicine(selectedMed);
    setSelectButton(currentMedicineId)
  
  };



  return (
    <div >
      <FormControl sx={{ m: 1, width: "75%" }}>
        <InputLabel >Medicine Name
        </InputLabel>
        <Select
          
          value={selectButton}
          onChange={handleChange}
          label="Medicine Name"
        >

          {medicineDetails.map(mD =>
            < MenuItem
              key={mD._id}
              value={mD._id}>{mD.medicineName}</MenuItem>
          )
          }
      
        </Select>
      </FormControl>
   
    </div>
  );
}
