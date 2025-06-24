import { Box, Typography } from '@mui/material'
import React from 'react'

const Quotes = () => {
  return (
    <Box className="quotes" sx={{textAlign: "end"}}>
        <Typography gutterBottom variant='overline' fontStyle="italic">A business that makes nothing but money is a poor business.</Typography>
          <Typography>- Henry Ford</Typography>

    </Box>
  )
}

export default Quotes