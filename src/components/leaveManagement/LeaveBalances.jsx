import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';

const style = {
  layout: {
    display: 'grid',
    gap: 2,
    padding: 2,
    borderRadius: 2,
    border: '1px solid #888',
    width: 'fit-content',
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
    border: '1px solid #888',
  },
  label: {
    fontSize: 16,
    color: '#222',
  },
};

const leaveData = [
  { label: 'Total Leaves', value: '21' },
  { label: 'Sick Leave', value: '06' },
  { label: 'Casual Leave', value: '08' },
  { label: 'Vacation Leave', value: '07' },
];

const LeaveBalances = () => (
  <Box>
    <Typography sx={{ mb: 1, fontSize: 18 }}>Leave Balances:</Typography>
    <Paper sx={style.layout} >
      <Box sx={style.leaves}>
        {leaveData.map((leave) => (
          <Box key={leave.label} sx={style.leaveBox}>
            <Button variant="outlined" sx={style.numberBtn} disableRipple>
              <Typography sx={{ fontSize: 32, fontWeight: 500 }}>{leave.value}</Typography>
            </Button>
            <Typography sx={style.label}>{leave.label}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  </Box>
);

export default LeaveBalances;