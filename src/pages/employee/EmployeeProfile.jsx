import { Box, Button, Card, Grid, List, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useEmployee } from '../../contexts/EmployeeProvider';
import { enumToString } from '../../util/helpers';
import { LogoutRounded } from '@mui/icons-material';
import TeamMembers from '../../components/managerProfile/TeamMembers';
import SideDrawer from '../../components/employeeProfile/SideDrawer';
import useIsMobile from '../../util/useMobile';


const ManagerProfile = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const {manager, setManager, shift} = useEmployee();
  const {isTablet, isMobile} = useIsMobile()

  return (
    <Paper>
    <Grid container spacing={4}>
        <Grid size={{xs:"grow"}}>
          <Grid container spacing={4}>
            <Grid size={{xs:12}}>
              <Typography color="primary" variant='h5' textAlign="center">Your Profile</Typography>
              <Grid container spacing={4}>
                <Grid >
                <Card sx={{alignSelf: "start"}}>
                  <AccountCircle sx={{height: "100px", width: "100px "}} />
                </Card>
                </Grid>
                <Grid >
                  <Box>
                    <Typography variant='h6'>{user.employeeName}</Typography>
                    <Typography >Employee id: EMP{user.id}</Typography>
                  </Box>
                  <Typography variant='h6'>email: {user.email}</Typography>
                  <Typography variant='h6'>Shift: {enumToString(shift.type)}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid size={{xs:12}}>
              <Typography color="primary" variant='h5' textAlign="center">Reporting Manager</Typography>
              <Grid container spacing={4}>
                <Grid >
                <Card sx={{alignSelf: "start"}}>
                  <AccountCircle sx={{height: "100px", width: "100px "}} />
                </Card>
                </Grid>
                <Grid >
                  <Box>
                    <Typography variant='h6'>{manager.employeeName}</Typography>
                    <Typography >Employee id: EMP{manager.id}</Typography>
                  </Box>
                  <Typography variant='h6'>email: {manager.email}</Typography>
                  <Typography variant='h6'>Shift: {enumToString(shift.type)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            
          </Grid>
        </Grid>
        <Grid size={{xs:"auto"}}>
          {!isTablet && 
            <Box sx={{borderLeft: `1px solid ${theme.palette.primary.main}`,
                display: "grid",
                placeContent: "start",
                padding: 4, gap: 4,
                placeItems: "start",
                "& > *": {
                  display: "flex",
                  gap: 2
                }
              }}>
              <Button onClick={()=>navigate("/")}><SpaceDashboardIcon />Dashboard</Button>
              <Button  onClick={()=>navigate("/leaveManagement")}><EditNoteIcon />Leave</Button>
              <Button  onClick={()=>navigate("/attendanceManagement")}><AssignmentTurnedInIcon />Attendance</Button>
            </Box>
          }
          {isTablet &&
            <SideDrawer />
          }
        </Grid>
    </Grid>
    </Paper>
  )
}

export default ManagerProfile