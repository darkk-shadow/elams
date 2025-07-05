import { Box, Button, Card, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';
import { useEmployeeLeave } from '../../contexts/EmployeeLeaveProvider';
import { Grid } from '@mui/system';

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
		placeContent: "space-evenly",
		gap: 4,
		gridTemplateColumns: "repeat(5, 1fr)"	
	},
	leave: {
		display: "grid",
		textAlign: "center",
		placeItems: "center",
	}
}

const LeaveSummary = () => {

  const {leaveData} = useEmployeeLeave();
  const navigate = useNavigate();

  return (
    <Paper sx={style.layout}>

			<Button
				onClick={()=>navigate("/leaveManagement")}
				sx={{ gap: 1, justifySelf: "start" }}
			>Leave Balances<LaunchIcon fontSize='small' /></Button>


			<Grid container spacing={4}>

				{leaveData.map(d => (
					d.label != "More" ?
					<Grid size={{xs:6, md:3	}}>
						<Paper variant='outlined' sx={{...style.leave, borderColor: d.color}} >
							<d.icon sx={{color: d.color}} />
							<Typography sx={{color: d.color}} >{d.label}</Typography>
							<Typography variant='h6' sx={{color: d.color}} >{d.value}</Typography>
						</Paper></Grid>
						:
						<Paper variant='outlined'  onClick={()=>navigate("/leaveManagement")}
							sx={{...style.leave, borderColor: d.color, ":hover": {cursor: "pointer"}}} >
							<d.icon sx={{color: d.color}} />
							<Typography sx={{color: d.color}} >{d.label}</Typography>
						</Paper>
				))}

			</Grid>
		</Paper>
  )
}

export default LeaveSummary