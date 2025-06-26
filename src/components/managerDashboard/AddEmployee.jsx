import { CheckBox } from '@mui/icons-material'
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import React, { useState } from 'react'
import { addEmployee, addEmployeeToTeam } from '../../services/employeeService'
import axios from "axios"
import useSnackBar from '../../contexts/useSnackBar'
import { useAuth } from '../../contexts/AuthProvider'

const AddEmployee = ({open, setOpen}) => {

  const [role, setRole] = useState("");

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
    const employeeName = e.target[0].value;
    const email = e.target[2].value;
    const addToManager = e.target[6].checked;
    const employee = { employeeName, email }

    if(role=="employee"){
      addEmployee(employee)
        .then((r)=>{
          const savedUser = r.data;
          showSnackBar(
            `${savedUser.employeeName}(${savedUser.id}) with ${savedUser.email} added.`);

            if(addToManager){
              addEmployeeToTeam(user.id, savedUser.id)
                .then((r)=>showSnackBar(`${savedUser.employeeName} added to your team`))
                .catch(e=>showSnackBar(e.response.data))
            }
        })
        .catch((e)=>{
          console.log(e);
          showSnackBar(
            `can't able to add ${email}: ${e.response.data.message}`, "error")
        })
    }

    setOpen(false);
  }

  return (
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Paper sx={style.modal}>
        <Typography>Add Employee</Typography>
        <form style={style.form} onSubmit={submitHandler}> 
          <TextField label="Employee Name" required />
          <TextField label="Employee Email" type='email' required/>
          <FormControl>
            <InputLabel id="emp-role-label">Employee Role</InputLabel>
            <Select label="Employee Role" labelId='emp-role-label' onChange={(e)=>setRole(e.target.value)}
                defaultChecked required>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
            </FormControl>
            
            {role=="employee" && <FormControlLabel 
              control={<Checkbox />}
              label="add to your team"
            />}
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

export default AddEmployee