import { Box, Button, Grid, Typography } from '@mui/material'
import { useState } from 'react';
import AddEmployee from '../managerDashboard/AddEmployee';
import AssignShift from '../managerDashboard/AssignShift';
import AddEmployeeToTeam from './AddEmployeeToTeam';
import RemoveEmployeeFromTeam from './RemoveEmployeeFromTeam';
import DeleteEmployee from './DeleteEmployee';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useIsMobile from '../../util/useMobile';
import Action from './Action';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useNavigate } from 'react-router-dom';

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
    const {isMobile} = useIsMobile();

    const data = [
      {
        label: "Add_Employee",
        action: ()=>setOpenAddEmployee(true),
        icon: PersonAddAltIcon,
        color: "primary",
      },
      {
        label: "Assign_Shift",
        action: ()=>setOpenAssignShift(true),
        icon: AccessTimeIcon,
        color: "primary",
      },
      {
        label: "Add_to_team",
        action: ()=>setOpenAddEmployeeToTeam(true),
        icon: GroupAddIcon,
        color: "primary",
      },
      {
        label: "Remove_from_team",
        action: ()=>setOpenRemoveEmployeeFromTeam(true),
        icon: GroupRemoveIcon,
        color: "warning",
      },
      {
        label: "Delete_Employee",
        action: ()=>setOpenDeleteEmployee(true),
        icon: PersonRemoveIcon,
        color: "error",
      },
    ]

  return (<>
    <AddEmployee open={OpenAddEmployee} setOpen={setOpenAddEmployee}/>
    <AssignShift open={openAssignShift} setOpen={setOpenAssignShift}/>
    <AddEmployeeToTeam open={openAddEmployeeToTeam} setOpen={setOpenAddEmployeeToTeam}/>
    <RemoveEmployeeFromTeam open={openRemoveEmployeeFromTeam} setOpen={setOpenRemoveEmployeeFromTeam}  />
    <DeleteEmployee open={openDeleteEmployee} setOpen={setOpenDeleteEmployee} />
    {isMobile &&

    <Box
      sx={{position: "fixed", bottom: 24, right: 24, zIndex: 1000}}>
        <Action data={data} />
      </Box>
    }
    {!isMobile &&
      <Grid container alignContent="space-between" spacing={4}>
        {data.map(d => (
          <Grid size={{xs: 2.4}}>
            <Button variant="outlined" color={d.color} onClick={d.action}>
              <Typography>{d.label.replaceAll("_"," ")}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid  >
    }
    </>)
}

export default HeroLinks