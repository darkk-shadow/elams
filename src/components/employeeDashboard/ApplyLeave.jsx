import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import { useEmployeeLeave } from '../../contexts/EmployeeLeaveProvider'
import { useAuth } from '../../contexts/AuthProvider'

const ApplyLeave = ({open, setOpen}) => {

  const {leaveTypes} = useEmployeeLeave();
  const {user} = useAuth();

  const [leaveType, setLeaveType] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
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

  

  return (
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Paper sx={style.modal}>
        <Typography>Apply Leave</Typography>
        <form style={style.form}>
          <Autocomplete
            onChange={(e,v) => setLeaveType(v.label)}
            disablePortal
            options={leaveTypes.map(l=>({label: l}))}
            sx={{ width: 300 }}
            renderInput={(params) => {
            return <TextField {...params} label="Leave Type" />}}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Leave from date" onChange={(e) => setFromDate(e.format("YYYY-MM-DD"))} />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Leave to date" onChange={(e) => setToDate(e.format("YYYY-MM-DD"))} />
          </LocalizationProvider>
          
          
        <TextField label="Reason" onChange={e => setReason(e.target.value)} />
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