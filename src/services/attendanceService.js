import axios from "axios"

const attendanceReportAx = axios.create({baseURL: "http://localhost:9193/api/attendance-reports"});

export const getCustomEmployeesAttendanceSummary= (managerId, startDate, endDate) => {
  return attendanceReportAx.get(`/manager/${managerId}/custom/?startDate=${startDate}&endDate=${endDate}`)
}