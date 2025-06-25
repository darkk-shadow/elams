import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import AttendanceReport from './AttendanceReport';
import AddEmployee from './AddEmployee';
import { useSnackbar } from 'notistack';
import useSnackBar from '../../contexts/useSnackBar';

/** @type {import('@mui/system').SxProps} */
const styles = {
  layout: {
    display: "grid",
    gridAutoFlow: "column",
    placeContent: "space-between",
    gap: 4,
  },
  "& > *": {
    placeSelf: "center"
  }
}

const QuickActions = () => {
  const [OpenAddEmployee, setOpenAddEmployee] = useState(false);


  return (<>
    <AddEmployee open={OpenAddEmployee} setOpen={setOpenAddEmployee}/>
    <Box sx={styles.layout}>
      <Button variant='outlined'>
        <Typography>Add Employee</Typography>
      </Button>
      <Button variant='outlined' >
        <Typography>Assign Shift</Typography>
      </Button>
      <Button variant='outlined'>
        <Typography>Manage Leave</Typography>
      </Button>
      <Button variant='outlined'>
        <Typography>Manage Attendance</Typography>
      </Button>
      <Button variant='outlined'>
        <Typography>Manage Employee</Typography>
      </Button>
    </Box>
    </>
  )
}

export default QuickActions