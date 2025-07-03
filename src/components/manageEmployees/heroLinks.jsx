import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react';
import AddEmployee from '../managerDashboard/AddEmployee';
import AssignShift from '../managerDashboard/AssignShift';
import AddEmployeeToTeam from './AddEmployeeToTeam';
import RemoveEmployeeFromTeam from './RemoveEmployeeFromTeam';
import DeleteEmployee from './DeleteEmployee';

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

const HeroLinks = () => {
    const [OpenAddEmployee, setOpenAddEmployee] = useState(false);
    const [openAssignShift, setOpenAssignShift] = useState(false);
    const [openAddEmployeeToTeam, setOpenAddEmployeeToTeam] = useState(false);
    const [openRemoveEmployeeFromTeam, setOpenRemoveEmployeeFromTeam] = useState(false);
    const [openDeleteEmployee, setOpenDeleteEmployee] = useState(false);


  return (<>
    <AddEmployee open={OpenAddEmployee} setOpen={setOpenAddEmployee}/>
    <AssignShift open={openAssignShift} setOpen={setOpenAssignShift}/>
    <AddEmployeeToTeam open={openAddEmployeeToTeam} setOpen={setOpenAddEmployeeToTeam}/>
    <RemoveEmployeeFromTeam open={openRemoveEmployeeFromTeam} setOpen={setOpenRemoveEmployeeFromTeam}  />
    <DeleteEmployee open={openDeleteEmployee} setOpen={setOpenDeleteEmployee} />
    
    <Box sx={styles.layout}>
      <Button variant='outlined' onClick={()=>setOpenAddEmployee(true)}>
        <Typography>Add Employee</Typography>
      </Button>
      <Button variant='outlined' onClick={()=>setOpenAssignShift(true)}>
        <Typography>Assign Shift</Typography>
      </Button>
      <Button variant='outlined' onClick={()=>setOpenAddEmployeeToTeam(true)}>
        <Typography>Add Employee to team</Typography>
      </Button>
      <Button variant='outlined' color="warning" onClick={()=>setOpenRemoveEmployeeFromTeam(true)}>
        <Typography>Remove Employee from team</Typography>
      </Button>
      <Button variant='outlined' color='error' onClick={()=>setOpenDeleteEmployee(true)}>
        <Typography>Delete Employee</Typography>
      </Button>
    </Box>
    </>)
}

export default HeroLinks