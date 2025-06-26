import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const leaveRequests = [
  { type: 'Sick Leave', from: '12 Jul 2024', to: '15 Jul 2024', status: 'Pending', comment: 'NIL' },
  { type: 'Casual Leave', from: '12 June 2024', to: '15 Jul 2024', status: 'Approved', comment: 'NIL' },
  { type: 'Sick Leave', from: '12 Jul 2024', to: '15 Jul 2024', status: 'Rejected', comment: 'Cant proceed' },
  { type: 'Sick Leave', from: '12 Jul 2024', to: '15 Jul 2024', status: 'Pending', comment: 'NIL' },
];

const LeaveRequests = () => {
  const theme = useTheme();
  return (
    <TableContainer component={Paper} sx={{
      borderRadius: 2,
      border: `1px solid ${theme.palette.divider}`,
      padding: 2,
      width: 'fit-content',
      marginTop: 2,
      background: theme.palette.background.default,
    }}>
      <Typography sx={{ mb: 1, fontSize: 18, color: theme.palette.text.primary }}>Leave Requests:</Typography>
      <Table sx={{ minWidth: 600 }} size="small" aria-label="leave requests table" border={0}>
        <TableHead>
          <TableRow sx={{ background: theme.palette.action.hover }}>
            <TableCell sx={{ fontWeight: 600, fontSize: 16, color: theme.palette.text.primary, border: `1px solid ${theme.palette.divider}` }} align="left">Type</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: 16, color: theme.palette.text.primary, border: `1px solid ${theme.palette.divider}` }} align="left">From</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: 16, color: theme.palette.text.primary, border: `1px solid ${theme.palette.divider}` }} align="left">To</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: 16, color: theme.palette.text.primary, border: `1px solid ${theme.palette.divider}` }} align="left">Status</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: 16, color: theme.palette.text.primary, border: `1px solid ${theme.palette.divider}` }} align="left">Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaveRequests.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell align="left" sx={{ border: `1px solid ${theme.palette.divider}`, color: theme.palette.text.primary }}>{row.type}</TableCell>
              <TableCell align="left" sx={{ border: `1px solid ${theme.palette.divider}`, color: theme.palette.text.primary }}>{row.from}</TableCell>
              <TableCell align="left" sx={{ border: `1px solid ${theme.palette.divider}`, color: theme.palette.text.primary }}>{row.to}</TableCell>
              <TableCell align="left" sx={{ border: `1px solid ${theme.palette.divider}`, color: theme.palette.text.primary }}>{row.status}</TableCell>
              <TableCell align="left" sx={{ border: `1px solid ${theme.palette.divider}`, color: theme.palette.text.primary }}>{row.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaveRequests;
