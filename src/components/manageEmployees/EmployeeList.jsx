import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { getEmployeesByManager, getShifts } from "../../services/employeeService";
import { useAuth } from "../../contexts/AuthProvider";



export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const { user } = useAuth();
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    getShifts()
      .then((r) => setShifts(r.data))
      .catch(e => console.error(e));

    getEmployeesByManager(user.id)
      .then((r) => setEmployees(r.data))
      .catch((e) => console.error(e));

  }, []);


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "employeeName",
      headerName: "Employee name",
      width: 350,
    },
    {
      field: "email",
      headerName: "Email",
      width: 400,
    },
    {
      field: "shiftId",
      headerName: "Shift",
      width: 400,
      valueGetter: (value) => `${shifts.find((s)=>s.id==value).type}`
    },
  ];

  return (
    <Box>
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
    </Box>
  );
}
