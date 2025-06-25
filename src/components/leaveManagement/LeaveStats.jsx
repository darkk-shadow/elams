import { Paper, Typography, Box } from '@mui/material';
import React from 'react';

const stats = [
  { label: 'Total leave Requested', value: '12' },
  { label: 'Total leave Approved', value: '08' },
  { label: 'Total leave Rejected', value: '02' },
  { label: 'Total leave Pending', value: '02' },
];

const style = {
  container: {
    border: '1px solid #222',
    borderRadius: '8px',
    padding: '10px 18px',
    background: '#fff',
    display: 'inline-block',
    minWidth: 260,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16,
    marginBottom: '4px',
    fontFamily: 'inherit',
  },
  label: {
    fontSize: 16,
    color: '#222',
    fontFamily: 'inherit',
  },
  value: {
    fontSize: 16,
    color: '#222',
    fontFamily: 'inherit',
    marginLeft: 2,
  },
};

const LeaveStats = () => (
  <Paper sx={style.container} elevation={0}>
    {stats.map((item) => (
      <Box key={item.label} sx={style.row}>
        <Typography sx={style.label}>{item.label}:</Typography>
        <Typography sx={style.value}>{item.value}</Typography>
      </Box>
    ))}
  </Paper>
);

export default LeaveStats;
