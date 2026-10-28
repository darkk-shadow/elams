import { useState } from "react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AccessTimeOutlined,
  BeachAccessOutlined,
  EventAvailableOutlined,
  ExitToAppOutlined,
  PreviewOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import elamsLogo from "../assets/elams-logo.svg";

const initialLeaveRequests = [
  { type: "Casual Leave", dates: "Nov 03 - Nov 04, 2026", status: "APPROVED" },
  { type: "Sick Leave", dates: "Oct 16, 2026", status: "PENDING" },
];

const attendance = [
  { date: "Oct 27, 2026", checkIn: "09:02 AM", checkOut: "06:04 PM", status: "Present" },
  { date: "Oct 26, 2026", checkIn: "08:56 AM", checkOut: "05:48 PM", status: "Present" },
  { date: "Oct 23, 2026", checkIn: "09:14 AM", checkOut: "06:10 PM", status: "Present" },
];

const DemoDashboard = () => {
  const [activeSection, setActiveSection] = useState("Overview");
  const [clockedIn, setClockedIn] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);

  const requestLeave = () => {
    setLeaveRequests((requests) => [
      { type: "Casual Leave", dates: "Sample request - dates not selected", status: "PENDING" },
      ...requests,
    ]);
    setActiveSection("Leave");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Box component="img" src={elamsLogo} alt="ELAMS" sx={{ width: 112, bgcolor: "white", borderRadius: 1, p: 0.5 }} />
          <Typography sx={{ flexGrow: 1, fontWeight: 700 }}>Employee Portal</Typography>
          <Chip label="SAMPLE EMPLOYEE" color="secondary" size="small" />
          <Button component={Link} to="/login" color="inherit" startIcon={<ExitToAppOutlined />}>
            Exit demo
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Alert severity="info" icon={<PreviewOutlined />} sx={{ mb: 3 }}>
          Frontend preview using fictional sample data. No real login, backend, or employee records are used; changes reset when you reload.
        </Alert>

        <Stack direction="row" spacing={1} sx={{ mb: 3 }} aria-label="Demo sections">
          {["Overview", "Attendance", "Leave"].map((section) => (
            <Button
              key={section}
              variant={activeSection === section ? "contained" : "outlined"}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </Button>
          ))}
        </Stack>

        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" fontWeight={700}>Good morning, Ananya</Typography>
            <Typography color="text.secondary">Employee ID: EMP1001 | Product Design | Bengaluru</Typography>
          </Box>

          {(activeSection === "Overview" || activeSection === "Attendance") && (
            <>
              {activeSection === "Overview" && (
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 2 }}>
                  {[
                    { label: "Leave balance", value: "12 days", icon: <BeachAccessOutlined color="primary" /> },
                    { label: "Present this month", value: "18 days", icon: <EventAvailableOutlined color="success" /> },
                    { label: "Pending requests", value: String(leaveRequests.filter((request) => request.status === "PENDING").length), icon: <AccessTimeOutlined color="warning" /> },
                    { label: "Today's attendance", value: clockedIn ? "Clocked in" : "Not clocked in", icon: <AccessTimeOutlined color="primary" /> },
                  ].map((item) => (
                    <Paper key={item.label} variant="outlined" sx={{ p: 2.5 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        {item.icon}
                        <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                      </Stack>
                      <Typography variant="h5" fontWeight={700} sx={{ mt: 2 }}>{item.value}</Typography>
                    </Paper>
                  ))}
                </Box>
              )}

              <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} spacing={2} sx={{ mb: 2 }}>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>Attendance</Typography>
                    <Typography color="text.secondary">Recent sample attendance records</Typography>
                  </Box>
                  {activeSection === "Overview" && (
                    <Button variant="contained" onClick={() => setClockedIn((value) => !value)}>
                      {clockedIn ? "Clock out (preview)" : "Clock in (preview)"}
                    </Button>
                  )}
                </Stack>
                <Table size="small" aria-label="Sample attendance">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell><TableCell>Check in</TableCell><TableCell>Check out</TableCell><TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendance.map((record) => (
                      <TableRow key={record.date}>
                        <TableCell>{record.date}</TableCell><TableCell>{record.checkIn}</TableCell><TableCell>{record.checkOut}</TableCell>
                        <TableCell><Chip size="small" color="success" label={record.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </>
          )}

          {(activeSection === "Overview" || activeSection === "Leave") && (
            <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} spacing={2} sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>Leave requests</Typography>
                  <Typography color="text.secondary">Sample requests and statuses</Typography>
                </Box>
                {activeSection === "Overview" && (
                  <Button variant="outlined" onClick={requestLeave}>Try sample leave request</Button>
                )}
              </Stack>
              <Table size="small" aria-label="Sample leave requests">
                <TableHead>
                  <TableRow><TableCell>Type</TableCell><TableCell>Dates</TableCell><TableCell>Status</TableCell></TableRow>
                </TableHead>
                <TableBody>
                  {leaveRequests.map((request, index) => (
                    <TableRow key={`${request.type}-${request.dates}-${index}`}>
                      <TableCell>{request.type}</TableCell><TableCell>{request.dates}</TableCell>
                      <TableCell><Chip size="small" color={request.status === "APPROVED" ? "success" : "warning"} label={request.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {activeSection === "Leave" && (
                <Button sx={{ mt: 2 }} variant="outlined" onClick={requestLeave}>Add sample request</Button>
              )}
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default DemoDashboard;
