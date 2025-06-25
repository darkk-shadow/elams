import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

const leaveRequests = [
  { type: 'Sick Leave', from: '12 Jul 2024', to: '15 Jul 2024', status: 'Pending', comment: 'NIL' },
  { type: 'Casual Leave', from: '12 June 2024', to: '15 Jul 2024', status: 'Approved', comment: 'NIL' },
  { type: 'Sick Leave', from: '12 Jul 2024', to: '15 Jul 2024', status: 'Rejected', comment: 'Cant proceed' },
  { type: 'Sick Leave', from: '12 Jul 2024', to: '15 Jul 2024', status: 'Pending', comment: 'NIL' },
];

const style = {
  container: {
    borderRadius: 2,
    border: '1px solid #888',
    padding: 2,
    width: 'fit-content',
    marginTop: 2,
  },
  table: {
    minWidth: 600,
  },
  header: {
    fontWeight: 600,
    fontSize: 16,
  },
};

const LeaveRequests = () => (
  <>
    <Typography sx={{ mb: 1, fontSize: 18 }}>Leave Requests</Typography>
    <TableContainer component={Paper} sx={style.container}>
      <Table sx={style.table} size="small" aria-label="leave requests table" border={1}>
        <TableHead>
          <TableRow sx={{ background: '#f5f5f5' }}>
            <TableCell sx={style.header} align="left" style={{ border: '1px solid #bbb' }}>Type</TableCell>
            <TableCell sx={style.header} align="left" style={{ border: '1px solid #bbb' }}>From</TableCell>
            <TableCell sx={style.header} align="left" style={{ border: '1px solid #bbb' }}>To</TableCell>
            <TableCell sx={style.header} align="left" style={{ border: '1px solid #bbb' }}>Status</TableCell>
            <TableCell sx={style.header} align="left" style={{ border: '1px solid #bbb' }}>Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaveRequests.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row.type}</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row.from}</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row.to}</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row.status}</TableCell>
              <TableCell align="left" style={{ border: '1px solid #ddd' }}>{row.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

export default LeaveRequests;
