import React from 'react'
import { Box } from '@mui/material'
import LeaveBalances from '../components/leaveManagement/LeaveBalances'
import LeaveRequests from '../components/leaveManagement/LeaveRequests'
import LeaveStats from '../components/leaveManagement/LeaveStats'
import ApplyLeaveButton from '../components/leaveManagement/ApplyLeaveButton'
const EmployeeLeave = () => {
  return (
    <Box sx={{ p: 2, maxWidth: 900, mx: 'auto' }}>
      {/* Top row: Button right aligned */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', mb: 1 }}>
        <Box />
        <ApplyLeaveButton />
      </Box>
      {/* Main content: Left and right groups with a gap */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: 6,
      }}>
        {/* Left group: LeaveBalances and LeaveRequests stacked */}
        <Box sx={{ display: 'grid', gridTemplateRows: 'auto auto', gap: 2, alignItems: 'flex-start' }}>
          <LeaveBalances />
          <LeaveRequests />
        </Box>
        {/* Right group: LeaveStats aligned to top right */}
        <Box sx={{ display: 'grid', alignItems: 'flex-start', pt: 2 }}>
          <LeaveStats />
        </Box>
      </Box>
    </Box>
  )
}

export default EmployeeLeave