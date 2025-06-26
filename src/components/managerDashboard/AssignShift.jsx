import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import useSnackBar from '../../contexts/useSnackBar'
import { useAuth } from "../../contexts/AuthProvider";
import { assignShift, getEmployeesByManager, getShifts } from '../../services/employeeService';


const AssignShift = ({open, setOpen}) => {

  const [shifts, setShifts] = useState([]);

  const [employees, setEmployees] = useState([]);

  const showSnackBar = useSnackBar();

  const {user} = useAuth();

  useEffect(()=>{
    getEmployeesByManager(user.id)
      .then((r) => setEmployees(r.data))
      .catch(e => console.error(e));

    getShifts()
      .then((r) => setShifts(r.data))
      .catch(e => console.error(e));
  },[])

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
    const shiftType = e.target[4].value;
    const employeeName = employees.find((e)=>e.id==employeeId).employeeName;
    assignShift(employeeId, shiftType)
      .then((r)=>showSnackBar(`${shiftType} shift assigned to ${employeeId}: ${employeeName}`))
      .catch((e)=>showSnackBar("Failed to assign shift","error"))
    setOpen(false);
  }

  return (
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Paper sx={style.modal}>
        <Typography>Assign Shift</Typography>
        <form style={style.form} onSubmit={submitHandler}> 

        <Autocomplete
          disablePortal
          options={employees.map(e=>({label:`${e.id} : ${e.employeeName}`}))}
          sx={{ width: 300 }}
          renderInput={(params) => {
          console.log(params)
          return <TextField {...params} label="Employee" />}}
        />  

        <Autocomplete
          disablePortal
          options={shifts.map(s=>({label:`${s.type}`}))}
          sx={{ width: 300 }}
          renderInput={(params) => {
          console.log(params)
          return <TextField {...params} label="Shift" />}}
        /> 
            
        <Box sx={{display: "flex", placeContent: "space-around"}}>
          <Button color='error' variant='outlined'
            onClick={()=>setOpen(false)}>Cancel</Button>
          <Button color="success" type="submit" variant='outlined'>Assign</Button>
        </Box>
        </form>
        </Paper>
      </Modal>
  )
}

export default AssignShift;