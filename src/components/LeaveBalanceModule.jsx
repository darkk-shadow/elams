import { Box, Card, Paper, Typography } from '@mui/material'
import React from 'react'

/** @type {import('@mui/system').SxProps} */
const style = {
    layout: {
        padding: 1,
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
    return (
        <Paper sx={style.layout}>
            <Typography>Leave Balances:</Typography>
            <Box sx={style.leaves}>
                <Box>
                    <Card><Typography>23</Typography></Card>
                    <Typography>Total Leaves</Typography>
                </Box>
                <Box>
                <Card><Typography>23</Typography></Card>
                    <Typography>Total Leaves</Typography>
                </Box>
                <Box>
                    <Card><Typography>23</Typography></Card>
                    <Typography>Total Leaves</Typography>
                </Box>
                <Box>
                    <Card><Typography>23</Typography></Card>
                    <Typography>Total Leaves</Typography>
                </Box>
                <Box>
                    <Card><Typography>23</Typography></Card>
                    <Typography>Total Leaves</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default LeaveBalanceModule