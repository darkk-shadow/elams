import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { enumToString } from '../../util/helpers'

const AttendanceDayInfo = ({attendance, isAbsent, isWeekEnd}) => {

  if(isAbsent || isWeekEnd){
    return (
      <paper>
        <Typography>
          {isAbsent? "Absent" : "Weeknd"}
        </Typography>
      </paper>
    )
  }

  return (
    <Paper> 
      <Typography variant='h6' textAlign="center">{enumToString(attendance.status)}</Typography>
      { 
        !attendance? <>No data</>
        :
        Object.keys(attendance)
        .filter(k=>k!="id" && k!="employeeId")
        .map(key=><Box sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          justifyContent: "space-between"
        }}>
          <Typography>{key}</Typography>
          <Typography>: {attendance[key]}</Typography>
        </Box>)
      }
    </Paper>
  )
}

export default AttendanceDayInfo