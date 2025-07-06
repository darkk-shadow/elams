import React from 'react'
import HeroLinks from '../../components/managerDashboard/HeroLinks'
import { Box, Grid, Typography } from '@mui/material'
import QuickActions from '../../components/managerDashboard/QuickActions'
import Charts from '../../components/managerDashboard/Charts'
import ManagerLeaveProvider from '../../contexts/ManagerLeaveProvider'
import useIsMobile from '../../util/useMobile'
import { useNavigate } from 'react-router-dom'
import Action from '../../components/managerDashboard/Action'

const ManagerDashboard = () => {

  const {isMobile} = useIsMobile();

  return (
    <Grid sx={{display: "grid", gap:4}}>
      <HeroLinks />
      <Typography align='center' variant='h4'>
        {isMobile? "Summary" : "Quick Actions"}
      </Typography>
      <QuickActions />
      <Charts />
    </Grid>
  )
}

export default ManagerDashboard