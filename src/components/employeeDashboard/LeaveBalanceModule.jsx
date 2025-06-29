import { Box, Button, Card, Paper, Typography } from '@mui/material'
import React from 'react'

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

const LeaveBalanceModule = () => {

	const navigate = useNavigate();
	const {leaveBalances} = useEmployeeLeave();

	return (
		<Paper>
			<Box sx={{display: "grid", gap:2}}>
			<Typography variant="h6">Leave Balances</Typography>
			<Box sx={{display: "grid", gridAutoFlow: "column", placeContent:"space-around"}}>
				{leaveBalances.map(lb => (
					<Box sx={style.leave} >
						<Button variant='outlined' >
							<Typography>{lb.balance}</Typography>
						</Button>
						<Typography>{enumToString(lb.leaveType)}</Typography>
					</Box>
				))}
			</Box>

			</Box>
		</Paper>
	)
}

export default LeaveBalanceModule