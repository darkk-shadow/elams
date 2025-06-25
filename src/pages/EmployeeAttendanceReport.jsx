import { ThemeContext } from '@emotion/react'
import { Card } from '@mui/material'
import React, { useContext } from 'react'

const EmployeeAttendanceReport = () => {

  const {darkTheme} = useContext(ThemeContext)

  return (
    <Card sx={{
      padding: 0, border: "none",
      borderRadius: 0,
      bgcolor: darkTheme ? "#303030" : "#eef7fa"
    }}
    variant='outlined'>

      {/* start coding here */}
      <div>EmployeeAttendanceReport</div>
        

    </Card>
  )
}

export default EmployeeAttendanceReport