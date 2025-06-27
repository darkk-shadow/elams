import { PieChart } from '@mui/x-charts/PieChart';
import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getLeaveRequestsByManager } from '../../services/leaveService';
import { useAuth } from '../../contexts/AuthProvider';

const data1 = [
  { label: 'Group A', value: 400 },
  { label: 'Group B', value: 300 },
  { label: 'Group C', value: 300 },
  { label: 'Group D', value: 200 },
];

const data2 = [
  { label: 'A1', value: 100 },
  { label: 'A2', value: 300 },
  { label: 'B1', value: 100 },
  { label: 'B2', value: 80 },
  { label: 'B3', value: 40 },
  { label: 'B4', value: 30 },
  { label: 'B5', value: 50 },
  { label: 'C1', value: 100 },
  { label: 'C2', value: 200 },
  { label: 'D1', value: 150 },
  { label: 'D2', value: 50 },
];

export default function LeaveDistribution() {

  const [leaveRequests, setLeaveRequests] = useState([]);
  const {user} = useAuth();

  const [leaveStatusDistribution, setLeaveStatusDistribution] = useState([]);
  const [leaveTypeDistribution, setLeaveTypeDistribution] = useState([]);

  useEffect(()=>{
    getLeaveRequestsByManager(user.id)
      .then(r => setLeaveRequests(r.data))
      .catch(e => console.error(e));

  },[])

  useEffect(()=>{
    let lsd={};
    leaveRequests.forEach(l => {
      if(lsd[l.status]) lsd[l.status]++
      else lsd[l.status]=1
    })

    let lsdData = [];
    for(let v in lsd){
      lsdData.push({
        label: v,
        value: lsd[v]
      })
    }
    setLeaveStatusDistribution(lsdData)

    let ltd={};
    leaveRequests.forEach(l => {
      if(ltd[l.leaveType]) ltd[l.leaveType]++
      else ltd[l.leaveType]=1
    })

    let ltdData = [];
    for(let v in ltd){
      ltdData.push({
        label: v,
        value: ltd[v]
      })
    }
    setLeaveTypeDistribution(ltdData)
  },[leaveRequests])

  return (
    <Paper>
      <Typography>Leave Distribution</Typography>
    <PieChart
      series={[
        {
          innerRadius: 0,
          outerRadius: 80,
          data: leaveStatusDistribution,
        },
        {
          innerRadius: 100,
          outerRadius: 120,
          data: leaveTypeDistribution,
        },
      ]}
      height={300}
      hideLegend
    /></Paper>
  );
}