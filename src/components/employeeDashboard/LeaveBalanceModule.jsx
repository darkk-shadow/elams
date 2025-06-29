import { Box, Button, Card, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useEmployeeLeave } from '../../contexts/EmployeeLeaveProvider';
import { enumToString } from '../../util/helpers';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // SICK_LEAVE      - blue
import MoneyOffIcon from '@mui/icons-material/MoneyOff';           // LOSS_OF_PAY     - red
import BeachAccessIcon from '@mui/icons-material/BeachAccess';     // CASUAL_LEAVE    - orange
import EventIcon from '@mui/icons-material/Event';                 // VACATION_LEAVE  - green
import ChildCareIcon from '@mui/icons-material/ChildCare';         // PATERNITY_LEAVE - purple
import AccessTimeIcon from '@mui/icons-material/AccessTime';       // COMPENSATORY_OFF- teal

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

const IconColors = [
  { icon: LocalHospitalIcon, color: 'blue' },
  { icon: MoneyOffIcon, color: 'red' },
  { icon: EventIcon, color: 'green' },
  { icon: BeachAccessIcon, color: 'orange' },
  { icon: ChildCareIcon, color: 'purple' },
  { icon: AccessTimeIcon, color: 'teal' },
];

const LeaveBalanceModule = () => {
	const {leaveBalances} = useEmployeeLeave();

	const [data, setData] = useState([])

	useEffect(()=>{
		if(!leaveBalances || leaveBalances.length<1) return;
		setData(
			leaveBalances.map((l,i)=>({
				...l,
				icon: IconColors[i].icon,
				color: IconColors[i].color
			}))
		)

	},[leaveBalances])

	return (
		<Paper>
			<Box sx={{display: "grid", gap:2}}>
			<Typography variant="h6">Leave Balances</Typography>
			<Box sx={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4, gridAutoFlow: "column", placeContent:"space-around"}}>
				{data.map(lb=> (
					<Paper variant='outlined' sx={{
						borderColor: lb.color, display: "grid",
						gap:1, placeItems: "center",
						
						}} >
						<lb.icon sx={{color: lb.color}} />
						<Typography>{enumToString(lb.leaveType)}</Typography>
						<Typography variant='h5' sx={{color: lb.color}}>{lb.balance}</Typography>
					</Paper>
				))}
			</Box>

			</Box>
		</Paper>
	)
}

export default LeaveBalanceModule