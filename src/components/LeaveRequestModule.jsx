import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const style = {
    layout: {
        padding: 1,
        display: "grid",
        gap: 1,
    },
}
const LeaveRequestModule = () => {
    
    return (
        <Paper sx={style.layout}>
            <Typography>Leave Requests:</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">From</TableCell>
                            <TableCell align="right">To</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from({length: 4}).map(e => (
                            <TableRow>
                                <TableCell align="right">Sick Leave</TableCell>
                                <TableCell align="right">12 Jul 2025</TableCell>
                                <TableCell align="right">15 Jul 2025</TableCell>
                                <TableCell align="right">Pending</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    )
}

export default LeaveRequestModule