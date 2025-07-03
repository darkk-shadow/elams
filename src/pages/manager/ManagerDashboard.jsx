import React from 'react'
import HeroLinks from '../../components/managerDashboard/HeroLinks'
import { Box, Typography } from '@mui/material'
import QuickActions from '../../components/managerDashboard/QuickActions'
import Charts from '../../components/managerDashboard/Charts'
import ManagerLeaveProvider from '../../contexts/ManagerLeaveProvider'

const ManagerDashboard = () => {
  return (
    <Box sx={{display: "grid", gap:4}}>
      <HeroLinks />
      <Typography align='center' variant='h4'>Quick Actions</Typography>
      <QuickActions />
      <Charts />
    </Box>
  )
}

export default ManagerDashboard