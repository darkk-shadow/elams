import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import useSnackBar from '../../contexts/useSnackBar'
import { useAuth } from "../../contexts/AuthProvider";
import { addEmployeeToTeam, assignShift, getAvailableEmployees, getEmployeesByManager, getShifts } from '../../services/employeeService';
import { useManagerAttendance } from '../../contexts/ManagerAttendanceProvider';
import { useManagerEmployees } from '../../contexts/ManagerEmployeesProvider';

const AddEmployeeToTeam = ({open, setOpen}) => {

  const {user} = useAuth()

  const showSnackBar = useSnackBar();
  const {availableEmployees, fetchData} = useManagerEmployees();

  /** @type {import('@mui/system').SxProps} */
  const style = {
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
    },
    form: {
      padding: "2em",
      display: "grid",
      gap: "1em"
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const employeeId = e.target[0].value.split(" ")[0];
    const employeeName = availableEmployees.find((e)=>e.id==employeeId).employeeName;
    addEmployeeToTeam(user.id, employeeId)
      .then((r)=>{
        showSnackBar(`${employeeName} Added to your team`);
      }).then(()=>fetchData())
      .catch((e)=>showSnackBar("Failed to add employee","error"))
    setOpen(false);
  }

  return (
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Paper sx={style.modal}>
        <Typography>Add Employee to the team</Typography>
        <form style={style.form} onSubmit={submitHandler}> 

        <Autocomplete
          disablePortal
          options={availableEmployees.map(e=>({label:`${e.id} : ${e.employeeName}`}))}
          sx={{ width: 300 }}
          renderInput={(params) => {
          return <TextField {...params} label="Employee" />}}
        />
            
        <Box sx={{display: "flex", placeContent: "space-around"}}>
          <Button color='error' variant='outlined'
            onClick={()=>setOpen(false)}>Cancel</Button>
          <Button color="success" type="submit" variant='outlined'>Add</Button>
        </Box>
        </form>
        </Paper>
      </Modal>
  )
}

export default AddEmployeeToTeam;