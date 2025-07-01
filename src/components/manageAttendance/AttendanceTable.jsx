import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEmployeeAttendance } from '../../contexts/EmployeeAttendanceProvider';

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
  },
  {
    field: "date",
    headerName: "Date",
  },
  {
    field: "clockInTime",
    headerName: "Clock in time",
  },
  {
    field: "clockOutTime",
    headerName: "Clock out time",
  },
  {
    field: "workHours",
    headerName: "Work hours",
  },
  {
    field: "status",
    headerName: "Status",
  },
  
];

const AttendanceTable = () => {

  const {managerAttendanceReport, managerAttendanceError,
    managerAttendanceLoading} = useEmployeeAttendance()

  return (
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
  );
};
export default AttendanceTable;
