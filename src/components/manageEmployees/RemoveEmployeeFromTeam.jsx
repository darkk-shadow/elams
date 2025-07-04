import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import { Box, Grid } from '@mui/system'
import React, { useState, useEffect } from 'react'
import useSnackBar from '../../contexts/useSnackBar'
import { useAuth } from "../../contexts/AuthProvider";
import { addEmployeeToTeam, getAvailableEmployees, getEmployeesByManager, removeEmployeeFromTeam } from '../../services/employeeService';
import { useManagerEmployees } from '../../contexts/ManagerEmployeesProvider';

const RemoveEmployeeFromTeam = ({open, setOpen}) => {

  const {employees, fetchData} = useManagerEmployees()

  const showSnackBar = useSnackBar();

  const {user} = useAuth();

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
    const employeeName = employees.find((e)=>e.id==employeeId).employeeName;
    removeEmployeeFromTeam(user.id, employeeId)
      .then((r)=>showSnackBar(`${r.data.employeeName} removed from your team`, "warning"))
      .then(()=>fetchData())
      .catch((e)=>showSnackBar(`Failed to remove ${r.data.employeeName} from your team`, "error"))
    setOpen(false);
  }

  return (
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Paper>
        <Typography>Remove Employee from the team</Typography>
        <form style={style.form} onSubmit={submitHandler}> 

        <Autocomplete
          disablePortal
          options={employees.map(e=>({label:`${e.id} : ${e.employeeName}`}))}
          renderInput={(params) => {
          return <TextField {...params} label="Employee" />}}
        />
            
        <Grid container justifyContent="space-around">
          <Button color='error' variant='outlined'
            onClick={()=>setOpen(false)}>Cancel</Button>
          <Button color="warning" type="submit" variant='outlined'>Remove</Button>
        </Grid>
        </form>
        </Paper>
      </Modal>
  )
}

export default RemoveEmployeeFromTeam;