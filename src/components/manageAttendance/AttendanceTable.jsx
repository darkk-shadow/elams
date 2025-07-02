import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEmployeeAttendance } from '../../contexts/EmployeeAttendanceProvider';
import { useManagerAttendance } from '../../contexts/ManagerAttendanceProvider';
import { enumToString } from '../../util/helpers';
import { Grow, Typography } from '@mui/material';

// [
//   {
//     "id": 0,
//     "clockInTime": "string",
//     "clockOutTime": "string",
//     "workHours": 0.1,
//     "date": "2025-07-01",
//     "status": "PRESENT",
//     "employeeId": 0,
//     "employeeName": "string"
//   }
// ]

const columns = [
  { field: "employeeId", headerName: "EID" },
  {
    field: "employeeName",
    headerName: "Employee name",
    flex: 1
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1
  },
  {
    field: "clockInTime",
    headerName: "Clock in time",
    flex: 1
  },
  {
    field: "clockOutTime",
    headerName: "Clock out time",
    flex: 1
  },
  {
    field: "workHours",
    headerName: "Work hours",
    flex: 1
  },
  {
    field: "status",
    headerName: "Status",
    valueGetter: (value) => enumToString(value),
    flex: 1
  },
  
];

const AttendanceTable = () => {

  const {managerAttendanceReport, managerAttendanceError,
    managerAttendanceLoading} = useManagerAttendance()

  return (<>
    <Typography variant='h6'>Attendance Reports</Typography>
    <DataGrid
      loading={managerAttendanceLoading}
      rows={managerAttendanceReport}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10]}
    />
  </>);
};
export default AttendanceTable;
