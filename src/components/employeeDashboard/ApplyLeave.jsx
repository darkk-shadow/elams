import { FormControl, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import React from 'react'

const ApplyLeave = ({open, setOpen}) => {


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
      gap: 1
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
        <FormControl fullWidth>
          <InputLabel id="type-leave-label">Leave type</InputLabel>
          <Select
            label="Leave type"
            labelId="type-leave-label"
            id="demo-simple-select" 
            onChange={()=>{}}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Leave from date" />
          </LocalizationProvider>
        </FormControl>
        </form>
        </Paper>
      </Modal>
  )
}

export default ApplyLeave