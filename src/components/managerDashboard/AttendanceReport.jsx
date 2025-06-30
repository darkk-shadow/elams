import { LineChart } from '@mui/x-charts/LineChart';
import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCustomEmployeesAttendanceSummary } from '../../services/attendanceService';
import { useAuth } from '../../contexts/AuthProvider';

export default function AttendanceReport() {

  const [values, setValues] = useState([]);
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);
  const [xAxis, setXAxis] = useState([]);

  useEffect(()=>{
    let date = new Date();
    let toDate = date.toISOString().slice(0,10);
    date.setDate(date.getDate()-10);
    let fromDate = date.toISOString().slice(0,10);
    setLoading(true);
    getCustomEmployeesAttendanceSummary(user.id, fromDate, toDate)
      .then(r => {
        let d = r.data.map(report => (report.totalPresents/report.totalEmployees)*100);
        setValues(d);
        setLoading(false);
  }).catch(e => console.log(e));
  },[])

  return (
    <Paper>
      <Typography>Attendance Report</Typography>
      <LineChart
        grid={{ vertical: true, horizontal: true }} 
        loading={loading}
        yAxis={[{ min: 0, max: 100, label: "percentage"}]}
        series={[
          {
            data: values,
          },
        ]}
        xAxis={[{label: "days", data: [1,2,3,4,5,6,7,8,9,10,11]}]}
        slots={{

        }}
        height={300}
      />
    </Paper>
  );
}