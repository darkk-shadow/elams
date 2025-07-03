import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import useSnackBar from '../../contexts/useSnackBar'
import { useAuth } from "../../contexts/AuthProvider";
import { addEmployeeToTeam, deleteEmployeeById, getAvailableEmployees, getEmployeesByManager, removeEmployeeFromTeam } from '../../services/employeeService';
import { useManagerEmployees } from '../../contexts/ManagerEmployeesProvider';

const DeleteEmployee = ({open, setOpen}) => {

  const {availableEmployees: employees, fetchData} = useManagerEmployees()

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
    deleteEmployeeById(employeeId)
      .then((r)=>showSnackBar(`employee deleted`, "warning"))
      .then(()=>fetchData())
      .catch((e)=>showSnackBar(`Failed to delete ${r.data.employeeName}`, "error"))
    setOpen(false);
  }

  return (
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Paper sx={style.modal}>
        <Typography>Delete Employee</Typography>
        <form style={style.form} onSubmit={submitHandler}> 

        <Autocomplete
          disablePortal
          options={employees.map(e=>({label:`${e.id} : ${e.employeeName}`}))}
          sx={{ width: 300 }}
          renderInput={(params) => {
          return <TextField {...params} label="Employee" />}}
        />
            
        <Box sx={{display: "flex", placeContent: "space-around"}}>
          <Button color='warning' variant='outlined'
            onClick={()=>setOpen(false)}>Cancel</Button>
          <Button color="error" type="submit" variant='outlined'>Delete</Button>
        </Box>
        </form>
        </Paper>
      </Modal>
  )
}

export default DeleteEmployee;