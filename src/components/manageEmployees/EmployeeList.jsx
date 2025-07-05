import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { getEmployeesByManager, getShifts } from "../../services/employeeService";
import { useAuth } from "../../contexts/AuthProvider";
import { useManagerEmployees } from "../../contexts/ManagerEmployeesProvider";
import { Paper, Typography } from "@mui/material";



export default function EmployeeList() {
  const {employees, shifts} = useManagerEmployees()


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "employeeName",
      headerName: "Employee name",
      // width: 350,
      flex: 1
    },
    {
      field: "email",
      headerName: "Email",
      // width: 400,
      flex: 1
    },
    {
      field: "shiftId",
      headerName: "Shift",
      flex: 1,
      // width: 400,
      valueGetter: (value) => `${shifts.find((s)=>s.id==value).type}`
    },
  ];

  return (
    <Paper>
      <Typography>Team Members</Typography>
      <DataGrid
        rows={employees}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        // disableRowSelectionOnClick
      />
    </Paper>
  );
}
