import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import LoginRoundedIcon from "@mui/icons-material/LoginRounded"

/** @type {import('@mui/system').SxProps} */
const style = {
  layout: {
    display: "grid",
    gap: 1,
    placeItems: "center"
  }
}

const ClockInModule = () => {

  return (
    <Paper sx={style.layout}>
          <Box sx={{display: "flex", gap: 1}}>
            <TimelapseRoundedIcon />
            <Typography>09:23:22</Typography>
          </Box>
          <Button size='small' variant="outlined" sx={{gap: 1}}>
            <LoginRoundedIcon />
            
            <Typography>{"Clock In"} </Typography>
          </Button>
          <Typography>
            Last Clocked in at 09:54,
          </Typography>
          <Typography>Today</Typography>
        </Paper>
  )
}

export default ClockInModule