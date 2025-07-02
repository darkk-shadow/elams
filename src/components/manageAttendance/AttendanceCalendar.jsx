import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import AttendanceDay from './AttendanceDay'
import dayjs from 'dayjs'
import { useManager } from '../../contexts/ManagerProvider'
import { getAttendanceByManager } from '../../services/attendanceService'
import { useAuth } from '../../contexts/AuthProvider'
import { generateManagerDailyAttendanceReport } from '../../util/generateManagerDailyAttendanceReport'


const AttendanceCalendar = () => {


  const [value, setValue] = useState(dayjs())
  const [attendanceReports, setAttendanceReports] = useState([]);
  const {teamCount} = useManager();
  const {user} = useAuth()

  useState(()=>{
    getAttendanceByManager(user.id)
      .then(r => {
        const report = generateManagerDailyAttendanceReport(r.data, teamCount);
        setAttendanceReports(report);
        console.log(report)
      })
  },[])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slots={{
            day: AttendanceDay,
          }}
          slotProps={{
            day: {
              attendanceReports: attendanceReports,
            },
          }}
        />
      </LocalizationProvider>
  )
}

export default AttendanceCalendar