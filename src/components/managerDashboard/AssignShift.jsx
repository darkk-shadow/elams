import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import { Box, Grid } from '@mui/system'
import React, { useState, useEffect } from 'react'
import useSnackBar from '../../contexts/useSnackBar'
import { useAuth } from "../../contexts/AuthProvider";
import { assignShift, getEmployeesByManager, getShifts } from '../../services/employeeService';
import { useManagerAttendance } from '../../contexts/ManagerAttendanceProvider';
import { useManagerEmployees } from '../../contexts/ManagerEmployeesProvider';
import useIsMobile from '../../util/useMobile';


const AssignShift = ({open, setOpen}) => {

  const {shifts, employees, fetchData} = useManagerEmployees();
  const {isMobile} = useIsMobile()

  const showSnackBar = useSnackBar();

  /** @type {import('@mui/system').SxProps} */
  const style = {
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: null,
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
    },
    form: {
      padding: isMobile? null : "2em",
      display: "grid",
      gap: "1em"
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const employeeId = e.target[0].value.split(" ")[0];
    const shiftType = e.target[4].value;
    const employeeName = employees.find((e)=>e.id==employeeId).employeeName;
    assignShift(employeeId, shiftType)
      .then((r)=>showSnackBar(`${shiftType} shift assigned to ${employeeId}: ${employeeName}`))
      .then(()=>fetchData())
      .catch((e)=>showSnackBar("Failed to assign shift","error"))
    setOpen(false);
  }

  return (
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Paper>
        <Typography>Assign Shift</Typography>
        <form style={style.form} onSubmit={submitHandler}> 

        <Autocomplete
          disablePortal
          options={employees.map(e=>({label:`${e.id} : ${e.employeeName}`}))}
          renderInput={(params) => {
          return <TextField {...params} label="Employee" />}}
        />  

        <Autocomplete
          disablePortal
          options={shifts.map(s=>({label:`${s.type}`}))}
          renderInput={(params) => {
          console.log(params)
          return <TextField {...params} label="Shift" />}}
        /> 
            
        <Grid container justifyContent="space-around">
          <Button color='error' variant='outlined'
            onClick={()=>setOpen(false)}>Cancel</Button>
          <Button color="success" type="submit" variant='outlined'>Assign</Button>
        </Grid>
        </form>
        </Paper>
      </Modal>
  )
}

export default AssignShift;