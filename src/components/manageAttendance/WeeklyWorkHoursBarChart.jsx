import React from 'react';
import { Typography, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const WeeklyWorkHoursBarChart = ({ weekDays, avgWorkHours }) => (
  <Paper sx={{ p: 1, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 240, width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
    <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem', fontWeight: 500, lineHeight: 1.2 }}>Average Work Hours (Weekly)</Typography>
    <BarChart
      xAxis={[{ data: weekDays, scaleType: 'band', label: 'Week Days' }]}
      series={[{ data: avgWorkHours, color: '#4FC3F7', label: 'Avg Work Hours' }]}
      yAxis={[{ min: 6, label: 'Work Hours' }]}
      height={160}
      grid={null}
    />
  </Paper>
);

export default WeeklyWorkHoursBarChart;
