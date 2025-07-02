import React, { useState } from "react";
import TopBar from "../../components/TopBar";
import Charts from "../../components/managerDashboard/Charts";
import { Box, Button, Grid, Paper, Tooltip, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { PieChart } from "@mui/x-charts/PieChart";
import AttendanceReport from "../../components/managerDashboard/AttendanceReport";
import AttendanceTable from "../../components/manageAttendance/AttendanceTable";
import { useManagerAttendance } from "../../contexts/ManagerAttendanceProvider";
import BootstrapTooltip from "../../util/BootStrapTooltip";

const SummaryCards = () => {
  const { noTappedIn, attendanceSummary, teamMembersCount, onLeave } =
    useManagerAttendance();

  const [avgHrs, setAvgHrs] = useState();

  useState(() => {
    console.log(attendanceSummary);
    let temp =
      attendanceSummary
        .map((a) => {
          let percentage = 0;
          if (teamMembersCount > 0) {
            percentage = (a.totalPresents / teamMembersCount) * 100;
          }
          return percentage;
        })
        .reduce((a, b) => a + b) / attendanceSummary.length;
    setAvgHrs(temp.toFixed(2));
  });

  const data = [
    {
      label: "Total",
      value: teamMembersCount,
      icon: <PeopleIcon color="primary" />,
      color: "primary.main",
      title: "Total team members in your team"
    },
    {
      label: "Present",
      value: noTappedIn,
      icon: <CheckCircleIcon sx={{ color: "green" }} />,
      color: "success.main",
      title: "Number of employees from your team tapped in today"
    },
    {
      label: "Absent",
      value: teamMembersCount - noTappedIn,
      icon: <CancelIcon sx={{ color: "red" }} />,
      color: "error.main",
      title: "Number of employees from your team absent today"
    },
    {
      label: "Leave",
      value: onLeave,
      icon: <BeachAccessIcon sx={{ color: "gold" }} />,
      color: "warning.main",
      title: "Number of employees from your team leave today"
    },
    {
      label: "Avg Hrs",
      value: `${avgHrs}%`,
      icon: <AccessTimeIcon sx={{ color: "#1976d2" }} />,
      color: "info.main",
      title: `Average working hour of your team for the past ${attendanceSummary.length} days`
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        placeContent: "space-around",
        gridAutoFlow: "column",
        gap: "10%",
      }}
    >
      {data.map((item, idx) => (
        <BootstrapTooltip title={item.title}>
        <Paper sx={{ display: "grid", placeItems: "center" }}>
          {item.icon}
          <Typography variant="subtitle1">{item.label}</Typography>
          <Typography variant="h5" sx={{ color: item.color }}>
            {item.value}
          </Typography>
        </Paper>
        </BootstrapTooltip>
      ))}
    </Box>
  );
};

export default SummaryCards;
