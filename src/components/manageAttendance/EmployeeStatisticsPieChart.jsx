import React from 'react';
import { Typography, Paper } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const EmployeeStatisticsPieChart = ({ data }) => (
  <Paper sx={{ p: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 240, width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
    <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem', fontWeight: 500, lineHeight: 1.2 }}>Employee Statistics</Typography>
    <PieChart
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
    />
  </Paper>
);

export default EmployeeStatisticsPieChart;
