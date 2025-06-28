import { Box, Button, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const LeaveBalances = () => {
  const theme = useTheme();

  const style = {
    layout: {
      display: 'grid',
      gap: 2,
      padding: 2,
      borderRadius: 2,
      border: `1px solid ${theme.palette.divider}`,
      width: 'fit-content',
      background: theme.palette.background.default,
    },
    leaves: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: 3,
      justifyContent: 'space-between',
      padding: 2,
    },
    leaveBox: {
      display: 'grid',
      gridTemplateRows: '1fr auto',
      alignItems: 'center',
      justifyItems: 'center',
      gap: 1,
    },
    numberBtn: {
      width: 70,
      height: 70,
      borderRadius: 3,
      fontSize: 32,
      fontWeight: 500,
      border: `1px solid ${theme.palette.divider}`,
      color: theme.palette.text.primary,
      background: theme.palette.background.default,
    },
    label: {
      fontSize: 16,
      color: theme.palette.text.primary,
    },
  };

  const leaveData = [
    { label: 'Total Leaves', value: '21' },
    { label: 'Sick Leave', value: '06' },
    { label: 'Casual Leave', value: '08' },
    { label: 'Vacation Leave', value: '07' },
  ];

  return (
    <Paper sx={style.layout}>
      <Typography sx={{ mb: 1, fontSize: 18, color: theme.palette.text.primary }}>Leave Balances:</Typography>
      <Box sx={style.leaves}>
        {leaveData.map((leave) => (
          <Box key={leave.label} sx={style.leaveBox}>
            <Button variant="outlined" sx={style.numberBtn} disableRipple>
              <Typography sx={{ fontSize: 32, fontWeight: 500, color: theme.palette.text.primary }}>{leave.value}</Typography>
            </Button>
            <Typography sx={style.label}>{leave.label}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default LeaveBalances;