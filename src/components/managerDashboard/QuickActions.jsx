import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import AttendanceReport from './AttendanceReport';
import AddEmployee from './AddEmployee';
import { useSnackbar } from 'notistack';
import useSnackBar from '../../contexts/useSnackBar';
import AssignShift from './AssignShift';
import { useNavigate } from 'react-router-dom';

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
  const [openAssignShift, setOpenAssignShift] = useState(false);

  const navigate = useNavigate();

  return (<>
    <AddEmployee open={OpenAddEmployee} setOpen={setOpenAddEmployee}/>
    <AssignShift open={openAssignShift} setOpen={setOpenAssignShift}/>
    <Box sx={styles.layout}>
      <Button variant='outlined' onClick={()=>setOpenAddEmployee(true)}>
        <Typography>Add Employee</Typography>
      </Button>
      <Button variant='outlined' onClick={()=>setOpenAssignShift(true)}>
        <Typography>Assign Shift</Typography>
      </Button>
      <Button variant='outlined' onClick={()=>navigate('/manage-leave')}>
        <Typography>Manage Leave</Typography>
      </Button>
      <Button variant='outlined'>
        <Typography>Manage Attendance</Typography>
      </Button>
      <Button variant='outlined' onClick={()=>navigate("manage-employee")}>
        <Typography>Manage Employee</Typography>
      </Button>
    </Box>
    </>
  )
}

export default QuickActions