import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import ShiftChart from './ShiftChart'
import LeaveDistribution from './LeaveDistribution'
import AttendanceReport from './AttendanceReport'
import useIsMobile from '../../util/useMobile'

const Charts = () => {

  const size = {xs: 12, md: 4}

  const comps = [
    {
      comp: <ShiftChart />,
      title: "Shift Chart"
    },
    {
      comp: <LeaveDistribution />,
      title: "Leave Request Distribution"
    },
    {
      comp: <AttendanceReport />,
      title: "Attendance Report"
    }
  ];

  return (
    <Grid container spacing={4} justifyContent="space-around">
      {comps.map(comp => (
        <Grid alignSelf="stretch" container size={size} justifyItems="center">
          <Paper sx={{ width: "100%"}}>
            <Grid>
              <Typography variant='h6'>{comp.title}</Typography>
            </Grid>
            <Grid >
              {comp.comp}
            </Grid>
          </Paper>
      </Grid>
      ))}
    </Grid>
  )
}

export default Charts