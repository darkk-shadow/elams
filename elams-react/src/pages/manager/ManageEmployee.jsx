import React from 'react'
import HeroLinks from '../../components/manageEmployees/heroLinks'
import EmployeeList from '../../components/manageEmployees/EmployeeList'
import { Box, Typography } from '@mui/material'
import { Grid } from '@mui/system'

/** @type {import('@mui/system').SxProps} */
const styles = {
  layout: {
    display: "grid",
    gap: "2em"
  }
}

const ManageEmployee = () => {
  return (<Grid container spacing={8}>
    <Grid size={{xs:12}}>
      <HeroLinks />
    </Grid>
    <Grid size={{xs:12}} container spacing={4}>
      <Grid size={{xs: 12}}>
        <Typography variant="h5">Team Members</Typography>
      </Grid>
      <Grid size={{xs: 12}}>
        <EmployeeList />
      </Grid>
    </Grid>
    </Grid>)
}

export default ManageEmployee