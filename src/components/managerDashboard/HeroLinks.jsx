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
import { useManagerAttendance } from '../../contexts/ManagerAttendanceProvider'
import BootstrapTooltip from '../../util/BootStrapTooltip'

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

  const {noPendingLeave, noTappedIn, teamMembersCount, onLeave } = useManagerAttendance();

  const data = [
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
      icon: FingerprintIcon,
      color: "gray",
      title: "Total employees tapped today"
    },
    {
      text: `Total Team`,
      value: teamMembersCount,
      icon: PeopleAltIcon,
      color: "blue",
      title: "Total employees in your team"
    },
    {
      text: `On leave`,
      value: onLeave,
      icon: BeachAccessIcon,
      color: "purple",
      title: "Employees on leave today"
    },
    {
      text: `Attendance`,
      value: `${Number((noTappedIn/teamMembersCount)*100).toFixed(2)}%`,
      icon: BarChartIcon,
      color: "green",
      title: "Today attendance percentage"
    }
  ];

  return (

    <Box sx={{
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 4
    }}>

      {console.log(data)}
        {data.map(e => (
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