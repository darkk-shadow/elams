import React from 'react'
import { Box } from '@mui/material'
import LeaveBalances from '../../components/leaveManagement/LeaveBalances'
import LeaveRequests from '../../components/leaveManagement/LeaveRequests'
import LeaveStats from '../../components/leaveManagement/LeaveStats'
import ApplyLeaveButton from '../../components/leaveManagement/ApplyLeaveButton'
import LeaveRequestDrafts from '../../components/leaveManagement/LeaveRequestDrafts'

const EmployeeLeave = () => {
  return (
    <Box sx={{ p: 2, maxWidth: 1100, mx: 'auto' }}>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '2.5fr 1fr',
        gap: 6,
        alignItems: 'start',
      }}>
        {/* Left group: LeaveBalances, LeaveRequests, and LeaveRequestDrafts stacked, left-aligned */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 3,
          width: '100%',
        }}>
          <LeaveBalances />
          <LeaveRequests />
          <LeaveRequestDrafts />
        </Box>
        {/* Right group: ApplyLeaveButton on top, LeaveStats below, right-aligned */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 3,
          width: '100%',
        }}>
          <ApplyLeaveButton />
          <LeaveStats />
        </Box>
      </Box>
    </Box>
  )
}

export default EmployeeLeave