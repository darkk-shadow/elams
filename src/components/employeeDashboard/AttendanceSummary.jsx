import { Box, Card, Paper, Typography } from '@mui/material'
import React from 'react'

const AttendanceSummary = () => {
  return (
    <Paper sx={{display: "grid", gridTemplateRows: "auto 1fr", gap: 4}}>
    <Typography textAlign="center">AttendanceSummary</Typography>
    <Box sx={{
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr", gap: 4
    }}>
      <Card variant='outlined'>
        <Typography>  </Typography>
      </Card>
      <Card variant='outlined'>
        <Typography>  </Typography>
      </Card>
      <Card variant='outlined'>
        <Typography>  </Typography>
      </Card>
      <Card variant='outlined'>
        <Typography>  </Typography>
      </Card>
    </Box>
    </Paper>
  )
}

export default AttendanceSummary