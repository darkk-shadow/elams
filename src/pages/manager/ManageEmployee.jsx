import React from 'react'
import HeroLinks from '../../components/manageEmployees/HeroLinks'
import EmployeeList from '../../components/manageEmployees/EmployeeList'
import { Box } from '@mui/material'

/** @type {import('@mui/system').SxProps} */
const styles = {
  layout: {
    display: "grid",
    gap: "2em"
  }
}

const ManageEmployee = () => {
  return (<Box style={styles.layout}>
    <HeroLinks />
    <EmployeeList />
    </Box>)
}

export default ManageEmployee