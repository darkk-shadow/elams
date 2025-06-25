import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react';
import AddEmployee from '../managerDashboard/AddEmployee';
import AssignShift from '../managerDashboard/AssignShift';

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

const heroLinks = () => {
    const [OpenAddEmployee, setOpenAddEmployee] = useState(false);
    const [openAssignShift, setOpenAssignShift] = useState(false);


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
      <Button variant='outlined'>
        <Typography>Add Employee to team</Typography>
      </Button>
      <Button variant='outlined'>
        <Typography>Remove Employee from team</Typography>
      </Button>
      <Button variant='outlined' onClick={()=>navigate("manage-employee")}>
        <Typography>...</Typography>
      </Button>
    </Box>
    </>)
}

export default heroLinks