import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import AttendanceDay from './AttendanceDay'
import dayjs from 'dayjs'


const AttendanceCalendar = () => {


  const [value, setValue] = useState(dayjs())

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slots={{
            day: AttendanceDay,
          }}
        />
      </LocalizationProvider>
  )
}

export default AttendanceCalendar