import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const stats = [
  { label: 'Total leave Requested', value: '12' },
  { label: 'Total leave Approved', value: '08' },
  { label: 'Total leave Rejected', value: '02' },
  { label: 'Total leave Pending', value: '02' },
];

const LeaveStats = () => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        padding: '10px 18px',
        background: theme.palette.background.default,
        display: 'inline-block',
        minWidth: 260,
      }}
    >
      {stats.map((item) => (
        <Box
          key={item.label}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 16,
            marginBottom: '4px',
            fontFamily: 'inherit',
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              color: theme.palette.text.primary,
              fontFamily: 'inherit',
            }}
          >
            {item.label}:
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              color: theme.palette.text.primary,
              fontFamily: 'inherit',
              marginLeft: 2,
            }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default LeaveStats;
