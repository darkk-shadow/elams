import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import { useEmployeeLeave } from '../../contexts/EmployeeLeaveProvider'
import { useAuth } from '../../contexts/AuthProvider'
import { createLeaveRequest, getLeaveRequestByEmployee } from '../../services/leaveService'
import useSnackBar from '../../contexts/useSnackBar'

const ApplyLeave = ({open, setOpen}) => {

  const {leaveTypes, setLeaveRequests} = useEmployeeLeave();
  const {user} = useAuth();
  const showSnackBar = useSnackBar();

  const [leaveType, setLeaveType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [reason, setReason] = useState("");


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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const request = {
      employeeId: user.id,
      leaveType, startDate, endDate, reason
    }
    await createLeaveRequest(request)
      .then(r => showSnackBar("Leave request submitted"))
      .catch(e => showSnackBar("Failed to request leave: "+e.response.data.message, "error"));
    
    await getLeaveRequestByEmployee(user.id)
      .then(r => setLeaveRequests(r.data))
      .catch(e => console.error(e))
    setOpen(false)
  }

  return (
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Paper sx={style.modal}>
        <Typography>Apply Leave</Typography>
        <form style={style.form} onSubmit={handleSubmit}>
          <Autocomplete
            onChange={(e,v) => setLeaveType(v.label)}
            disablePortal
            options={leaveTypes.map(l=>({label: l}))}
            sx={{ width: 300 }}
            renderInput={(params) => {
            return <TextField {...params} label="Leave Type"  required/>}}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker format='DD-MM-YYYY' label="Leave from date"
              slotProps={{
                textField: {
                  required: true,
                },
              }}
              onChange={(e) => setStartDate(e.format("YYYY-MM-DD"))} />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker format='DD-MM-YYYY' label="Leave to date"
              slotProps={{
                textField: {
                  required: true,
                },
              }}
              onChange={(e) => setEndDate(e.format("YYYY-MM-DD"))} />
          </LocalizationProvider>
          
          
        <TextField required label="Reason" onChange={e => setReason(e.target.value)} />
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

export default ApplyLeave