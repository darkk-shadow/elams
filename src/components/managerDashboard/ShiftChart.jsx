import { useAnimate } from '@mui/x-charts/hooks';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { styled } from '@mui/material/styles';
import { interpolateObject } from '@mui/x-charts-vendor/d3-interpolate';
import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getShiftReportByManager } from '../../services/employeeService';
import { useAuth } from '../../contexts/AuthProvider';

export default function ShiftChart() {
  
  const [shiftCount, setShiftCount] = useState({});
  const {user} = useAuth();

  useEffect(()=>{
    getShiftReportByManager(user.id)
      .then(r=>setShiftCount(r.data))
      .catch(e=>console.error(e))
  },[])

  return (
    <Paper>
      <Typography>Shift Chart</Typography>
    <ChartContainer
      xAxis={[{ scaleType: 'band', data: ['G', 'M', 'E', 'N'] }]}
      series={[
        {
          type: 'bar',
          id: 'base',
          data: [shiftCount.general, shiftCount.morning, shiftCount.evening, shiftCount.night],
        },
      ]}
      width={300}
      height={300}
    >
      <BarPlot barLabel="value" slots={{ barLabel: BarLabel }} />
      <ChartsXAxis />
      <ChartsYAxis />
    </ChartContainer>
    </Paper>
  );
}

const Text = styled('text')(({ theme }) => ({
  ...theme?.typography?.body2,
  stroke: 'none',
  fill: (theme.vars || theme)?.palette?.text?.primary,
  transition: 'opacity 0.2s ease-in, fill 0.2s ease-in',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  pointerEvents: 'none',
}));

function BarLabel(props) {
  const {
    seriesId,
    dataIndex,
    color,
    isFaded,
    isHighlighted,
    classes,
    xOrigin,
    yOrigin,
    x,
    y,
    width,
    height,
    layout,
    skipAnimation,
    ...otherProps
  } = props;

  const animatedProps = useAnimate(
    { x: x + width / 2, y: y - 8 },
    {
      initialProps: { x: x + width / 2, y: yOrigin },
      createInterpolator: interpolateObject,
      transformProps: (p) => p,
      applyProps: (element, p) => {
        element.setAttribute('x', p.x.toString());
        element.setAttribute('y', p.y.toString());
      },
      skip: skipAnimation,
    },
  );

  return (
    <Text {...otherProps} fill={color} textAnchor="middle" {...animatedProps} />
  );
}