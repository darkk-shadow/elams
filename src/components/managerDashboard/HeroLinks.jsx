import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useManagerLeave } from '../../contexts/ManagerLeaveProvider'
import { useNavigate } from 'react-router-dom'
import { getCustomEmployeesAttendanceSummary } from '../../services/attendanceService'
import { useAuth } from '../../contexts/AuthProvider'
import { getTeamMembetsCount } from '../../services/employeeService'

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
    setNoPendingLeave(
      leaveStatusDistribution.find(l=>l.label=="PENDING")?.value
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
      text: `No. Pending Leave Requests: ${ noPendingLeave}`,
    },
    {
      text: `No. Emplyees tapped in ${noTappedIn}`,
    },
    {
     text: `Employees in your team: ${ teamMembersCount}`,
    },
    {
     text: `No. Employees on leave: ${ onLeave}`,
    },
    {
     text: `No. Pending Leave Requests: ${ noPendingLeave}`,
    }
  ]

  return (

    <Box sx={styles.layout}>

      
    {links.map(e => (
      <Card sx={{padding: 0, height:100, display: "grid", placeContent: "center"}}> 
      <CardActionArea onClick={()=>navigate("")}>
        <CardContent sx={{ height: '100%' }}>
          <Typography variant='h6' align='center'>
            {e.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
))}

    </Box>
  )
}

export default HeroLinks