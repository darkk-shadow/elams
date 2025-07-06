import { CheckBox } from '@mui/icons-material'
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import { Box, Grid } from '@mui/system'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import React, { useState } from 'react'
import { addEmployee, addEmployeeToTeam, addManager } from '../../services/employeeService'
import axios from "axios"
import useSnackBar from '../../contexts/useSnackBar'
import { useAuth } from '../../contexts/AuthProvider'
import useApi from '../../util/useApi'
import { useManagerEmployees } from '../../contexts/ManagerEmployeesProvider'
import useIsMobile from '../../util/useMobile'

const AddEmployee = ({open, setOpen}) => {

  const {isMobile} = useIsMobile()

  const {fetchData} = useManagerEmployees();

  const [role, setRole] = useState("");

  const showSnackBar = useSnackBar();

  const {user} = useAuth();

  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  
  const {data, loading, error, request} = useApi();

  /** @type {import('@mui/system').SxProps} */
  const style = {
    // modal: {
    //   position: 'absolute',
    //   top: '50%',
    //   left: '50%',
    //   transform: 'translate(-50%, -50%)',
    //   bgcolor: 'background.paper',
    //   width: isMobile? null : 400,
    // },
    form: {
      padding: isMobile? null : "2em",
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
        }).then(()=>fetchData())
        .catch((e)=>{
          console.log(e);
          showSnackBar(
            `can't able to add ${email}: ${e.response.data.message}`, "error")
        })
    }else if(role == "manager"){

      request(()=>addManager(employee))
        .then((savedUser)=>{
          console.log('Manager added successfully:', savedUser);
          showSnackBar(
            `${savedUser.employeeName}(${savedUser.id}) with ${savedUser.email} added as manager.`
          );
        })
        .catch((e)=>{
        console.error('Failed to add manager:', e);
        showSnackBar(
          `Can't add ${email}: ${e.response?.data?.message || e.message || 'An unknown error occurred'}`,
          'error'
        );
      })
    }

    setOpen(false);
  }

  return (
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Paper>
        <Typography>Add Employee</Typography>
        <form style={style.form} onSubmit={submitHandler}> 
          <TextField label="Employee Name" required />
          <TextField label="Employee Email" type='email' required/>
          <FormControl>
            <InputLabel id="emp-role-label">Employee Role</InputLabel>
            <Select label="Employee Role" labelId='emp-role-label' onChange={(e)=>setRole(e.target.value)}
                defaultChecked="employee" required>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
            </FormControl>
            
            {role=="employee" && <FormControlLabel 
              control={<Checkbox />}
              label="add to your team"
            />}
             <Grid container justifyContent="space-around">
                <Button color='error' variant='outlined'
                  onClick={()=>setOpen(false)}>Cancel</Button>
                <Button color="success" type="submit" variant='outlined'>Add</Button>
              </Grid>
        </form>
        </Paper>
      </Modal>
  )
}

export default AddEmployee