import React from 'react';
import { Typography, Paper } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const EmployeeStatisticsPieChart = ({ data }) => (<>
  <Paper  sx={{display: "grid", gridTemplateRows:"auto 1fr"}} >
  <Typography >Employee Statistics</Typography>
    <PieChart   sx={{}}
      series={[{
        data,
        innerRadius: 40,
        outerRadius: 80,
        paddingAngle: 3,
        cornerRadius: 5,
        startAngle: 0,
        endAngle: 360,
      }]}
      width={180}
      height={180}
      legend={{ hidden: false }}
      slotProps={{
        legend: {
          direction: 'horizontal',
          position: { 
            vertical: 'bottom',
            horizontal: 'center',
          }
        }
      }}
    />
  </Paper>
  </>);

export default EmployeeStatisticsPieChart;
