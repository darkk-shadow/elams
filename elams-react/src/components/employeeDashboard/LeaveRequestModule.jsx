import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEmployeeLeave } from "../../contexts/EmployeeLeaveProvider";
import { Button, Paper, Typography } from "@mui/material";
import ApplyLeave from "./ApplyLeave";

export default function LeaveRequests() {
  const { leaveRequests } = useEmployeeLeave();
  const [modalOpen, setModalOpen] = useState(false);

  const columns = [
    { field: "id", headerName: "Leave Id" },
    {
      field: "leaveType",
      headerName: "Leave type",
      flex: 0.7
    },
    {
      field: "startDate",
      headerName: "From Date",
      flex: 0.5
    },
    {
      field: "endDate",
      headerName: "To Date",
      flex: 0.5
    },
    {
      field: "reason",
      headerName: "Reason",
      flex: 1
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5
    },
  ];

  return (
    <Paper >
      <Box sx={{display: "grid", gap:2}}>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Typography variant="h6">Leave Requests</Typography>
          
            <ApplyLeave open={modalOpen} setOpen={setModalOpen} />
            <Button variant='outlined' sx={{ gap: 1, justifySelf: "start" }}
              onClick={()=>setModalOpen(true)}
            >
              <EditNoteIcon />
              <Typography>{"Apply Leave"} </Typography>
            </Button>

        </Box>
      <DataGrid 
        rows={leaveRequests}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
      </Box>
    </Paper>
  );
}
