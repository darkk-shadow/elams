import { Box, Button, Card, Paper, Typography } from '@mui/material'
import React from 'react'

import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';

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
		height: "100px",
		justifyContent: "space-between",
		"& > div": {
			height: "100%",
			display: "grid",
			gridTemplateRows: "1fr auto",
			gap: 1,
			"& > div": {
				display: "grid",
				placeContent: "center"
			}
		}
	},
	leave: {

	}
}

const LeaveBalanceModule = () => {

	const navigate = useNavigate();

	return (
		<Paper sx={style.layout}>

			<Button
				onClick={()=>navigate("/leaveManagement")}
				sx={{ gap: 1, justifySelf: "start" }}
			>Leave Balances<LaunchIcon fontSize='small' /></Button>
			<Box sx={style.leaves}>

				{Array.from({ length: 5 }).map(e => (
					<Box >
						<Button variant='outlined' >
							<Typography>23</Typography>
						</Button>
						<Typography>Total Leaves</Typography>
					</Box>
				))}

			</Box>
		</Paper>
	)
}

export default LeaveBalanceModule