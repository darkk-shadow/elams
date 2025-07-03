import { Box, Button, Card, List, Paper, Typography, useTheme } from '@mui/material'
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
import { useManager } from '../../contexts/ManagerProvider';
import TeamMembers from '../../components/managerProfile/TeamMembers';


const ManagerProfile = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const {employee, teamMembers} = useManager();

  return (
    <Paper sx={{
        height: "100%",
        display: "grid", gridAutoFlow: "column",
        gap:"2em", gridTemplateColumns: "7fr 2fr",
      }}>
        <Box sx={{display: "grid", gap: 5, placeItems:"start", ml:10,
          gridTemplateRows: "auto 1fr",
        }}>
          <Box sx={{display: "grid", gap:"1em", mt:"2em"}}>
            <Typography color="primary" variant='h5' textAlign="center">Your Profile</Typography>
            <Box sx={{
                display: "grid", gridAutoFlow: "column", gap:"2em",
                gridTemplateColumns: "auto 1fr",
                justifySelf: "center"
              }}>
              <Card sx={{alignSelf: "start"}}>
                <AccountCircle sx={{height: "100px", width: "100px "}} />
              </Card>
              <Box sx={{ display: "grid"}}>
                <Box>
                  <Typography variant='h6'>{user.employeeName}</Typography>
                  <Typography >Employee id: EMP{user.id}</Typography>
                </Box>
                <Typography variant='h6'>email: {user.email}</Typography>
                {/* <Box sx={{display: "flex", gap: 2}}>
                  <Button variant='outlined' color='warning'>Change password</Button>
                  <Button variant='outlined'>Update profile</Button>
                </Box> */}
              </Box>
            </Box>
          </Box>
          <TeamMembers teamMembers={teamMembers}/>
        </Box>
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
        <Button  onClick={()=>navigate("/manage-leave")}><EditNoteIcon />Leave</Button>
        <Button  onClick={()=>navigate("/manage-attendance")}><AssignmentTurnedInIcon />Attendance</Button>
        <Button color='error' onClick={()=>navigate("/logout")}><LogoutRounded />Logout</Button>
      </Box>
    </Paper>
  )
}

export default ManagerProfile