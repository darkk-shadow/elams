import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import LaunchIcon from '@mui/icons-material/Launch';


/** @type {import('@mui/system').SxProps} */
const style = {
    layout: {
        display: "grid",
        gap: 1,
        gridTemplateRows: "auto 1fr"
    },
}
const LeaveRequestModule = () => {

    return (
        <Paper sx={style.layout}>

            <Button sx={{ gap: 1, justifySelf: "start" }}>
                Leave Requests<LaunchIcon fontSize='small' />
            </Button>
            <TableContainer sx={{ justifySelf: "start" }} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="left">From</TableCell>
                            <TableCell align="left">To</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from({ length: 5 }).map(e => (
                            <TableRow>
                                <TableCell align="left">Sick Leave</TableCell>
                                <TableCell align="left">12 Jul 2025</TableCell>
                                <TableCell align="left">15 Jul 2025</TableCell>
                                <TableCell align="left">Pending</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    )
}

export default LeaveRequestModule