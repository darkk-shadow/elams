import React, { useState, useEffect, useCallback } from 'react';
import { Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Collapse } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useAuth } from '../../contexts/AuthProvider';
import useSnackBar from '../../contexts/useSnackBar';
import apiClient from '../../services/api';

const ManageLeave = () => {
  const { user } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(''); // 'approve' or 'reject'
  const [selectedId, setSelectedId] = useState(null);
  const [reasonText, setReasonText] = useState('');
  const [showOnLeaveDialog, setShowOnLeaveDialog] = useState(false);
  const [showReqs, setShowReqs] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const showSnackBar = useSnackBar();

  // Fetch leave requests for employees under this manager
  const fetchLeaves = useCallback(() => {
    if (!user?.id) return;
    apiClient.get(`/api/leave-requests/by-manager/${user.id}`)
      .then(res => {
        const all = res.data || [];
        setLeaveRequests(all.filter(lr => lr.status === 'PENDING'));
        let temp = all.filter(lr => lr.status === 'APPROVED' || lr.status === 'REJECTED');
        setApprovedLeaves(temp.sort((a, b) => b.id - a.id));
        setLastRefreshed(new Date());
      })
      .catch(err => console.error(err));
  }, [user?.id]);

  // Initial load
  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(fetchLeaves, 10000);
    return () => clearInterval(interval);
  }, [fetchLeaves]);

  // Approve leave request
  const handleApprove = async (id) => {
    try {
      await apiClient.put(`/api/leave-requests/${id}/status?status=APPROVED`);
      fetchLeaves();
      showSnackBar("Leave approved")
    } catch (err) {
      console.error('Approve error:', err);
      showSnackBar('Failed to approve leave: '+err.response?.data?.message,"error");
    }
  };

  // Open dialog for reject action
  const handleDialogOpen = (id, action) => {
    if (action === 'approve') {
      handleApprove(id);
      // Do not open dialog for approve
      return;
    }
    setSelectedId(id);
    setDialogAction(action);
    setReasonText('');
    setDialogOpen(true);
  };

  // Close the dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedId(null);
    setReasonText('');
  };

  // Submit the rejection reason
  const handleDialogSubmit = async () => {
    try {
      await apiClient.put(`/api/leave-requests/${selectedId}/status?status=REJECTED`);
      fetchLeaves();
    } catch (err) {
      console.error('Reject error:', err);
      alert('Failed to reject leave.');
    }
    handleDialogClose();
  };

  // Calculate pending count
  const pendingCount = leaveRequests.length;

  // Employees on leave today (from history: only APPROVED leaves intersecting today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const employeesOnLeaveToday = approvedLeaves
    .filter(req => req.status === 'APPROVED')
    .filter(req => {
      const start = new Date(req.startDate);
      const end = new Date(req.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return start <= today && end >= today;
    });

  // Unique employees on leave today
  const uniqueEmployeesOnLeaveToday = Array.from(
    new Map(
      employeesOnLeaveToday.map(req => [req.employeeId, req])
    ).values()
  );

  // DataGrid columns for pending requests
  const pendingColumns = [
    { field: 'employeeId', headerName: 'ID', width: 90 },
    { field: 'employeeName', headerName: 'Name', width: 180 },
    { field: 'leaveType', headerName: 'Leave Type', width: 150 },
    {
      field: 'days',
      headerName: 'Days',
      width: 180,
      renderCell: (params) => {
        const { startDate, endDate } = params.row;
        if (startDate && endDate) {
          const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000*60*60*24)) + 1;
          const label = days === 1 ? '1 day' : `${days} days`;
          return (
            <span>{label}</span>
          );
        }
        return '-';
      }
    },
    {
      field: 'dateRange',
      headerName: 'From - To',
      width: 200,
      renderCell: (params) => {
        const { startDate, endDate } = params.row;
        if (startDate && endDate) {
          return (
            <span>
              {new Date(startDate).toLocaleDateString('en-GB')} - {new Date(endDate).toLocaleDateString('en-GB')}
            </span>
          );
        }
        return '-';
      }
    },
    { field: 'reason', headerName: 'Reason', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button color="success" variant="contained" size="small" onClick={() => handleApprove(params.row.id)} style={{ marginRight: 8 }}>
            Approve
          </Button>
          <Button color="error" variant="contained" size="small" onClick={() => handleDialogOpen(params.row.id, 'reject')}>
            Reject
          </Button>
        </>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  // DataGrid columns for history
  const historyColumns = [
    { field: 'employeeId', headerName: 'ID', width: 90 },
    { field: 'employeeName', headerName: 'Name', width: 180 },
    { field: 'leaveType', headerName: 'Leave Type', width: 150 },
    {
      field: 'days',
      headerName: 'Days',
      width: 180,
      renderCell: (params) => {
        const { startDate, endDate } = params.row;
        if (startDate && endDate) {
          const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000*60*60*24)) + 1;
          const label = days === 1 ? '1 day' : `${days} days`;
          return (
            <span>{label}</span>
          );
        }
        return '-';
      }
    },
    {
      field: 'dateRange',
      headerName: 'From - To',
      width: 200,
      renderCell: (params) => {
        const { startDate, endDate } = params.row;
        if (startDate && endDate) {
          return (
            <span>
              {new Date(startDate).toLocaleDateString('en-GB')} - {new Date(endDate).toLocaleDateString('en-GB')}
            </span>
          );
        }
        return '-';
      }
    },
    { field: 'reason', headerName: 'Reason', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          <IconButton onClick={()=> setShowReqs(p=>!p)}>
            {showReqs? <ArrowDropDownIcon />: <ArrowRightIcon  />}
          </IconButton>
          Manage Leave Requests
          <IconButton onClick={fetchLeaves} title="Refresh" size="small" sx={{ ml: 1 }}>
            <RefreshIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            Last updated: {lastRefreshed.toLocaleTimeString()}
          </Typography>
        </Typography>
        <Button
          variant="contained"
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: 200 }}
          onClick={() => employeesOnLeaveToday.length > 0 && setShowOnLeaveDialog(true)}
        >
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
            Pending Leave Requests: {pendingCount}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            On Leave Today: {uniqueEmployeesOnLeaveToday.length}
          </Typography>
        </Button>
      </Box>
      <Collapse in={showReqs}> <DataGrid
        rows={leaveRequests}
        columns={pendingColumns}
        getRowId={(row) => row.id}
        autoHeight
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        sx={{ mb: 4 }}
      /></Collapse>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, mt: 3 }}>
        History
      </Typography>
      <DataGrid
        rows={[...approvedLeaves, ...leaveRequests.filter(lr => lr.status === 'REJECTED')]}
        columns={historyColumns}
        getRowId={(row) => row.id}
        autoHeight
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />
      {dialogAction === 'reject' && (
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Reject Leave</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Reason for rejection"
              type="text"
              fullWidth
              value={reasonText}
              onChange={e => setReasonText(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogSubmit} variant="contained" color="error">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {showOnLeaveDialog && (
        <Dialog open={showOnLeaveDialog} onClose={() => setShowOnLeaveDialog(false)}>
          <DialogTitle>Employees on Leave Today</DialogTitle>
          <DialogContent>
            <TextField
              multiline
              fullWidth
              minRows={4}
              value={uniqueEmployeesOnLeaveToday.map(req => `${req.employeeId} - ${req.employeeName}`).join('\n')}
              InputProps={{ readOnly: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowOnLeaveDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};


export default ManageLeave;
