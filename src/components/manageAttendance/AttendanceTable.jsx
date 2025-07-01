import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import { Chip } from '@mui/material';

const generateRows = (count = 7) => {
    return Array.from({ length: count }).map((_, idx) => {
      const status = getRandomStatus();
      return {
        id: `EMPID${(idx + 1).toString().padStart(3, '0')}`,
        date: getRandomDate(),
        clockIn: status === 'Present' || status === 'On Leave' ? getRandomTime() : '',
        clockOut: status === 'Present' || status === 'On Leave' ? getRandomTime() : '',
        hours: status === 'Present' || status === 'On Leave' ? getRandomWorkHours() : '',
        status,
      };
    });
  };

const getRandomDate = () => {
  const start = new Date(2025, 5, 1); // June 1, 2025
  const end = new Date(2025, 5, 27); // June 27, 2025
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const getRandomStatus = () => {
  const statuses = ['Present', 'Absent', 'On Leave'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomTime = () => {
  const hour = Math.floor(Math.random() * 3) + 8; // 8-10 AM
  const min = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
};

const getRandomWorkHours = () => {
  return (Math.random() * 4 + 4).toFixed(2); // 4-8 hours
};



const statusColorMap = {
  Present: 'success',
  Absent: 'error',
  'On Leave': 'warning',
  Leave: 'warning',
};
const statusLabelMap = {
  Present: 'Present',
  Absent: 'Absent',
  'On Leave': 'Leave',
  Leave: 'Leave',
};


const AttendanceTable = () => {
  const [rows] = useState(generateRows(7));
  return (
    <Box sx={{ mt: 4 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Employee Id</TableCell>
              <TableCell>Clock In</TableCell>
              <TableCell>Clock Out</TableCell>
              <TableCell>Total Work Hours</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.clockIn}</TableCell>
                <TableCell>{row.clockOut}</TableCell>
                <TableCell>{row.hours}</TableCell>
                <TableCell>
                  <Chip
                    label={statusLabelMap[row.status]}
                    color={statusColorMap[row.status]}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                  <EditIcon fontSize="small" sx={{ ml: 1, cursor: 'pointer' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default AttendanceTable;
