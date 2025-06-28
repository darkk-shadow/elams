import { Box, Button, Collapse, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import LoginRoundedIcon from "@mui/icons-material/LoginRounded"
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useAuth } from '../../contexts/AuthProvider';
import { clockIn, clockOut, getAttendanceByEmployeeToday, getLastAttendanceByEmployee, isClockedIn, isClockedOut } from '../../services/attendanceService';
import useSnackBar from '../../contexts/useSnackBar';

/** @type {import('@mui/system').SxProps} */
const style = {
  layout: {
    display: "grid",
    gap: 1,
    placeItems: "center"
  }
}

const ClockInModule = () => {

  const [clockedIn, setClockedIn] = useState(false);
  const [clockedOut, setClockedOut] = useState(false);
  const [clockedInTime, setClockedInTime] = useState("00:00:00")
  const [clockedOutTime, setClockedOutTime] = useState("00:00:00")
  const [lastClockedDate, setLastClokedDate] = useState("Today")

  const {user} = useAuth()
  const showSnackBar = useSnackBar();

  useEffect(()=>{
    isClockedIn(user.id)
      .then(r => {
        setClockedIn(r.data);
      })
      .catch(e => console.log(e));
  })

  useEffect(()=>{
    if(clockedIn){
      getAttendanceByEmployeeToday(user.id)
        .then(r=>setClockedInTime(r.data.clockInTime.split(".")[0]))
        .catch(e => console.error(e))
    }
  })
  
  useEffect(()=>{
    isClockedOut(user.id)
    .then(r => setClockedOut(r.data))
    .catch(e => console.log(e));
  })
  
  useEffect(()=>{
    if(clockedOut){
      getAttendanceByEmployeeToday(user.id)
        .then(r=>setClockedOutTime(r.data.clockOutTime.split(".")[0]))
        .catch(e => console.error(e))
    }
  })

  useEffect(()=>{
    if(!clockedIn && !clockedIn){
      getLastAttendanceByEmployee(user.id)
        .then(r =>{
          setLastClokedDate(r.data.date)
          if(r.data.clockOutTime) setClockedOutTime(r.data.clockOutTime)
          else setClockedInTime(r.data.clockInTime)
        })
        .catch(e => {
          console.log(e);
          setLastClokedDate("--/--/--")
        })
    }else{
      setLastClokedDate("Today")
    }
  })

  const clockInHandler = () => {
    clockIn(user.id)
      .then(r => {
        showSnackBar(`Clocked in at ${r.data.clockInTime}`)
        setClockedIn(true)
      })
      .catch(e => showSnackBar(e.response.data.message))
  }
  const clockOutHandler = () => {
    confirm("Are you sure want to clock out?")
    clockOut(user.id)
      .then(r => {
        showSnackBar(`Clocked out at ${r.data.clockOutTime}`)
        setClockedOut(true)
      })
      .catch(e => showSnackBar(e.response.data.message))
  }

  return (
    <Paper sx={style.layout}>
          <Box sx={{display: "flex", gap: 1}}>
            <TimelapseRoundedIcon />
            <Typography>09:23:22</Typography>
          </Box>
          { (!clockedIn) ?
          <Button size='small' variant="outlined" sx={{gap: 1}} onClick={clockInHandler}>
            <LoginRoundedIcon />
            <Typography>{"Clock In"} </Typography>
          </Button> :
          <Button size='small' variant="outlined" color='warning'
            disabled={clockedOut} sx={{gap: 1}} onClick={clockOutHandler}>
            <LogoutRoundedIcon />
            <Typography>{"Clock Out"} </Typography>
          </Button>
          }
          { clockedOut || (!clockedOut && !clockedIn)  ?
          <Typography>
            Last Clocked out at {clockedOutTime},
          </Typography> :
          <Typography>
            Last Clocked in at {clockedInTime},
        </Typography>
          }
          <Typography>on {lastClockedDate}</Typography>
        </Paper>
  )
}

export default ClockInModule