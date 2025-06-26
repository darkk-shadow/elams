import React, { useState } from 'react';
import { Paper, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const initialDrafts = [
  { id: 1, type: 'Sick Leave', from: '2025-07-01', to: '2025-07-03', reason: 'Fever' },
  { id: 2, type: 'Casual Leave', from: '2025-07-10', to: '2025-07-11', reason: 'Personal work' },
];

const LeaveRequestDrafts = () => {
  const theme = useTheme();
  const [drafts, setDrafts] = useState(initialDrafts);

  const handleSubmit = (id) => {
    setDrafts(drafts.filter(d => d.id !== id));
    // Here you would send the draft to the backend as a real leave request
    alert('Leave request submitted!');
  };

  const handleDelete = (id) => {
    setDrafts(drafts.filter(d => d.id !== id));
  };

  return (
    <Paper sx={{
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 2,
      padding: 2,
      background: theme.palette.background.default,
      mt: 3,
      minWidth: 400,
    }}>
      <Typography sx={{ fontSize: 18, mb: 2, color: theme.palette.text.primary }}>
        Leave Request Drafts
      </Typography>
      {drafts.length === 0 ? (
        <Typography color="text.secondary">No drafts saved.</Typography>
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ background: theme.palette.action.hover }}>
                <TableCell>Type</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drafts.map((draft) => (
                <TableRow key={draft.id}>
                  <TableCell>{draft.type}</TableCell>
                  <TableCell>{draft.from}</TableCell>
                  <TableCell>{draft.to}</TableCell>
                  <TableCell>{draft.reason}</TableCell>
                  <TableCell align="right">
                    <Button size="small" color="success" variant="outlined" sx={{mr:1}} onClick={() => handleSubmit(draft.id)}>
                      Submit
                    </Button>
                    <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(draft.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default LeaveRequestDrafts;
