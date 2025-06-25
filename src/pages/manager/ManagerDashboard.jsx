import React from 'react'
import HeroLinks from '../../components/managerDashboard/heroLinks'
import { Box, Typography } from '@mui/material'
import QuickActions from '../../components/managerDashboard/QuickActions'

const ManagerDashboard = () => {
  return (<Box sx={{display: "grid", gap:2}}>
    <HeroLinks />
    <Typography align='center' variant='h3'>Quick Actions</Typography>
    <QuickActions />
  </Box>)
}

export default ManagerDashboard