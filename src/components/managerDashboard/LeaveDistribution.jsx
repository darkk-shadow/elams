import { PieChart } from '@mui/x-charts/PieChart';
import { Paper, Typography } from '@mui/material';
import { useManagerLeave } from '../../contexts/ManagerLeaveProvider';

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

   const {leaveStatusDistribution, leaveTypeDistribution} = useManagerLeave()

  return (
    <Paper>
      <Typography>Leave Distribution</Typography>
    <PieChart
      series={[
        {
          innerRadius: 0,
          outerRadius: 80,
          data: leaveStatusDistribution,
          paddingAngle: 3,
          cornerRadius: 5,
          startAngle: 0,
          endAngle: 360,
        },
        {
          innerRadius: 100,
          outerRadius: 120,
          data: leaveTypeDistribution,
          paddingAngle: 3,
          cornerRadius: 5,
          startAngle: 0,
          endAngle: 360,
        },
      ]}
      height={300}
    /></Paper>
  );
}