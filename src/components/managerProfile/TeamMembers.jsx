import { Box, Card, Typography } from '@mui/material'
import React from 'react'

const TeamMembers = ({teamMembers}) => {
  return (<>
  <Typography variant='h6'>Team-Members({teamMembers.length})</Typography>
    <Box sx={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 4
    }}>
      {teamMembers.map(e => (
        <Card variant='outlined' sx={{padding: 4}}>
          <Typography>{e.employeeName}</Typography>
          <Typography variant='caption'>EID: EMP{e.id}</Typography>
          <Typography>{e.email}</Typography>
        </Card>
      ))}
    </Box>
    </>)
}

export default TeamMembers