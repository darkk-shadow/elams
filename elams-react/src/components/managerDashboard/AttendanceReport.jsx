import { LineChart } from '@mui/x-charts/LineChart';
import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCustomEmployeesAttendanceSummary } from '../../services/attendanceService';
import { useAuth } from '../../contexts/AuthProvider';
import { useManagerAttendance } from '../../contexts/ManagerAttendanceProvider';

export default function AttendanceReport() {

  const {attendanceSummaryValues, attedanceGraphloading} = useManagerAttendance()

  return (
      <LineChart
        height={300}
        grid={{ vertical: true, horizontal: true }} 
        loading={attedanceGraphloading}
        yAxis={[{ min: 0, max: 100}]}
        series={[
          {
            data: attendanceSummaryValues,label: "percentage",
          },
        ]}
        xAxis={[{label: "past 10 days",
            data: Array.from({length: 11}).map((_,i)=>i)}]}
      />
  );
}