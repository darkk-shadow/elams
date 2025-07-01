import { Box, Card, CardActionArea, CardContent, Tooltip, tooltipClasses, Typography } from '@mui/material'
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
import { fontSize, styled } from '@mui/system'

/** @type {import('@mui/system').SxProps} */
const styles = {
  layout: {
    display: "grid",
    gridAutoFlow: "column",
    placeItems: "center",
    gridTemplateColumns: "repeat(5, 1fr)",
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
      text: `Pending Requests`,
      value: noPendingLeave,
      icon: PendingActionsIcon,
      color: "orange",
      title: "Pending leave requests"
    },
    {
      text: `Tapped in`,
      value: noTappedIn,
      icon: FingerprintIcon ,
      color: "gray",
      title: "Total employees tapped today"
    },
    {
     text: `Total Team`,
      value: teamMembersCount,
      icon: PeopleAltIcon ,
      color: "blue",
      title: "Total employees in your team"
    },
    {
     text: `On leave`,
      value: onLeave,
      icon: BeachAccessIcon ,
      color: "purple",
      title: "Employees on leave today"
    },
    {
     text: `Attendance average`,
      value: 23,
      icon: BarChartIcon ,
      color: "green",
      title: "Attendance average of past 10 days"
    }
  ]

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (

    <Box sx={{
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 4
    }}>

      
        {links.map(e => (
          <BootstrapTooltip title={e.title} arrow >
          <Card sx={{display: "grid", placeItems: "center", gap: 2}}> 
              <e.icon sx={{color: e.color}} />
              <Typography>{enumToString(e.text)}</Typography>
              <Typography  variant='h5' sx={{color: e.color}}>{e.value}</Typography>
          </Card>
          </BootstrapTooltip>
    ))}

    </Box>
  )
}

export default HeroLinks