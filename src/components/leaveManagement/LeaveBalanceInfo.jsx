import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { useEmployeeLeave } from '../../contexts/EmployeeLeaveProvider'

const LeaveBalanceInfo = () => {

  const {leaveData} = useEmployeeLeave();

  return (
    <Paper sx={{display: "grid", placeContent: "center", padding: 4}}>
      {leaveData
      .filter(l=>l.label!="More")
      .map(l=>(
        <Box>
          <Box  sx={{
            display: "grid", gridTemplateColumns:"1fr auto",
            gap:2
          }}>
            <Typography>{l.label}</Typography>
            <Typography>: {l.value}</Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  )
}

export default LeaveBalanceInfo