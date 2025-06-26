import { ThemeContext } from '@emotion/react'
import { Card } from '@mui/material'
import React, { useContext } from 'react'
import {useCustomTheme} from '../contexts/ThemeContextProvider'

const PageWrapper = ({children}) => {

  const {darkTheme} = useCustomTheme()

  return (
    <Card sx={{
      padding: 0, border: "none",
      borderRadius: 0,
      bgcolor: darkTheme ? "#303030" : "#eef7fa",
      minHeight: "100%"
    }}
    variant='outlined'>
      
      {children}
        

    </Card>
  )
}

export default PageWrapper