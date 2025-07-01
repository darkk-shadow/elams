import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useManagerLeave } from '../../contexts/ManagerLeaveProvider'
import { useNavigate } from 'react-router-dom'
import { getCustomEmployeesAttendanceSummary } from '../../services/attendanceService'
import { useAuth } from '../../contexts/AuthProvider'
import { getTeamMembetsCount } from '../../services/employeeService'

import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BarChartIcon from '@mui/icons-material/BarChart';
import { enumToString } from '../../util/helpers'

/** @type {import('@mui/system').SxProps} */
const styles = {
  layout: {
    display: "grid",
    gridAutoFlow: "column",
    placeItems: "center",
    gap: 4,
  }
}

const HeroLinks = () => {

  const {leaveStatusDistribution, leaveRequests} = useManagerLeave();
  const [noTappedIn, setNoTappedIn] = useState(0);
  const {user} = useAuth();
  const [noPendingLeave, setNoPendingLeave] = useState(0);
  const [teamMembersCount, setTeamMembersCount] = useState(0);
  const [onLeave, setOnLeaveCount] = useState(0);

  useEffect(()=>{
    let date = new Date();
    let fDate = date.toISOString().slice(0,10);

    getCustomEmployeesAttendanceSummary(user.id, fDate, fDate)
      .then(r=>{
        console.log(r.data)
        setNoTappedIn(r.data[0].totalPresents)
      })
      .catch(e=>console.error(e))

    console.log(leaveStatusDistribution)
  },[])

  useEffect(()=>{
    getTeamMembetsCount(user.id)
      .then(r => setTeamMembersCount(r.data))
      .catch(e => console.error(e));
  },[])

  useEffect(()=>{
    let val = leaveStatusDistribution.find(l=>l.label=="PENDING")?.value
    setNoPendingLeave(
      val ? val : 0
    )
  },[leaveStatusDistribution])

  useEffect(()=>{
    let today = new Date()
    today.setHours(0, 0, 0, 0);
    let todayAbsentees = leaveRequests
        .filter(l => {
          const start = new Date(l.startDate);
          const end = new Date(l.endDate);
          start.setHours(0, 0, 0, 0);
          end.setHours(0, 0, 0, 0); 
          return start <= today && end >= today;
        })
        .filter(l => l.status == "APPROVED")
      setOnLeaveCount(todayAbsentees.length);
  },[leaveRequests])

  const links = [
    {
      text: `Pending Leave Requests`,
      value: noPendingLeave,
      icon: PendingActionsIcon,
      color: "orange"
    },
    {
      text: `No. Emplyees tapped in`,
      value: noTappedIn,
      icon: FingerprintIcon ,
      color: "gray"
    },
    {
     text: `Employees in your team`,
      value: teamMembersCount,
      icon: PeopleAltIcon ,
      color: "blue"
    },
    {
     text: `Employees on leave`,
      value: onLeave,
      icon: BeachAccessIcon ,
      color: "lightblue"
    },
    {
     text: `Past 10 days attendace average`,
      value: 23,
      icon: BarChartIcon ,
      color: "green"
    }
  ]

  return (

    <Box sx={styles.layout}>

      
    {links.map(e => (
      <Card sx={{padding: 0, height:100, display: "grid", placeContent: "center"}}> 
      <CardActionArea onClick={()=>navigate("")}>
        <CardContent sx={{ height: '100%' }}>
          <e.icon sx={{color: e.color}} />
          <Typography>{enumToString(e.text)}</Typography>
          <Typography variant='h5' sx={{color: e.color}}>{e.balance}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
))}

    </Box>
  )
}

export default HeroLinks