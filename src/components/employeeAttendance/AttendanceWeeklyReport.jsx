import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'


const AttendanceWeeklyReport = ({label, report}) => {

  const [data, setData] = useState()
  
  useEffect(()=>{
    if(!report) return
    const data = report.map(r=>r.workHours);
    console.log(data)
    setData(
      data
    )
  },[report])

  return (<>
    {data && 
    <Paper variant='outlined'>
      {console.log(data)}
      <Typography textAlign="center">{label}</Typography>
      <BarChart
        xAxis={[{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }]}
        series={[{ data: data, label: "work hours"}] }
        height={300}
        barLabel="value"
      />
    </Paper>}
  </>)
}

export default AttendanceWeeklyReport