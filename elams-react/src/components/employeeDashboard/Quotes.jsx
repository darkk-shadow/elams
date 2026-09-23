import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Quotes = () => {

  const [quotes, setQuotes] = useState("A business that makes nothing but money is a poor business.")
  const [author, setAuthor] = useState("Henry Ford")

  // useEffect(()=>{
  //   const api = axios.create({baseURL: "https://api.api-ninjas.com/v1/", headers:{"X-Api-Key":"N2sDdnV48G29rXbnfbXNYw==LLw7jEe9tsrS5oFM"}})
  //   api.get("quotes")
  //     .then(r =>{
  //       setQuotes(r.data[0].quote);
  //       setAuthor(r.data[0].author);
  //     })
  //     .catch(e => console.log(e));
  // },[])

  return (
    <Box className="quotes" sx={{textAlign: "end"}}>
        <Typography gutterBottom variant='overline' fontStyle="italic">{quotes}</Typography>
          <Typography>- {author}</Typography>

    </Box>
  )
}

export default Quotes