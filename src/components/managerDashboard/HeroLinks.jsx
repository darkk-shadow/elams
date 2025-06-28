import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'

/** @type {import('@mui/system').SxProps} */
const styles = {
  layout: {
    display: "grid",
    gridAutoFlow: "column",
    placeItems: "center",
    gap: 4,
  }
}

const HeroLinks = () => {

  return (

    <Box sx={styles.layout}>

      
    {Array.from({length:5}).map(e => (
      <Card sx={{padding: 0, height:100, display: "grid", placeContent: "center"}}> 
      <CardActionArea>
        <CardContent sx={{ height: '100%' }}>
          <Typography variant='h6' align='center'>
            No. Pending Leave Requests 12
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
))}

    </Box>  
  )
}

export default HeroLinks