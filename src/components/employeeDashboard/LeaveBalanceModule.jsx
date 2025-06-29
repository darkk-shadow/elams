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
		<Paper sx={style.layout}>

			<Button
				onClick={()=>navigate("/leaveManagement")}
				sx={{ gap: 1, justifySelf: "start" }}
			>Leave Balances<LaunchIcon fontSize='small' /></Button>


			<Box sx={style.leaves}>

				{leaveBalances.map(lb => (
					<Box sx={style.leave} >
						<Button variant='outlined' >
							<Typography>{lb.balance}</Typography>
						</Button>
						<Typography>{enumToString(lb.leaveType)}</Typography>
					</Box>
				))}

			</Box>
		</Paper>
	)
}

export default LeaveBalanceModule