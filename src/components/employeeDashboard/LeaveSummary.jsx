import { Box, Button, Card, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';
import { useEmployeeLeave } from '../../contexts/EmployeeLeaveProvider';
import { enumToString } from '../../util/helpers';

/** @type {import('@mui/system').SxProps} */
const style = {
	layout: {
		display: "grid",
		gap: 1,
	},
	leaves: {
		paddingX: 10,
		display: "grid",
		gridAutoFlow: "column",	
		placeItems: "space-between",
		gap: 1
	},
	leave: {
		display: "grid",
		gridTemplateRows: "1fr 1fr",
		textAlign: "center",
		maxWidth: "100px",
		minWidth: "min-content"
	}
}

const LeaveSummary = () => {

  const {allocatedLeaves, leaveBalances} = useEmployeeLeave();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(()=>{
    if(!allocatedLeaves || !leaveBalances) return;
    if(allocatedLeaves.length <1 && leaveBalances.length < 1) return;
    const totalBalance = leaveBalances.reduce((a, b)=>a+b.balance,0)
    const allLvs =  allocatedLeaves.reduce((a, b)=>a+b.balance,0)
    const usedLeave = allLvs - totalBalance
    const approvedLeave = usedLeave / 2;
    const rejectedLeave = usedLeave - approvedLeave;

    setData([
      {
        label: "Total Balance",
        value: totalBalance
      },
      {
        label: "Used Leaves",
        value: usedLeave
      },
      {
        label: "Approved Leaves",
        value: approvedLeave
      },
      {
        label: "Rejected Leaves",
        value: rejectedLeave
      },
      {
        label: "More",
        value: "..."
      }
    ])
  },[allocatedLeaves, leaveBalances])

  return (
    <Paper sx={style.layout}>

			<Button
				onClick={()=>navigate("/leaveManagement")}
				sx={{ gap: 1, justifySelf: "start" }}
			>Leave Balances<LaunchIcon fontSize='small' /></Button>


			<Box sx={style.leaves}>

				{data.map(d => (
					<Box sx={style.leave} >
						<Button variant='outlined' >
							<Typography>{d.value}</Typography>
						</Button>
						<Typography>{d.label}</Typography>
					</Box>
				))}

			</Box>
		</Paper>
  )
}

export default LeaveSummary