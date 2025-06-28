import axios from "axios"

const attendanceReportAx = axios.create({baseURL: "http://localhost:9193/api/attendance-reports"});
const attendanceAx = axios.create({baseURL: "http://localhost:9193/api/attendances"});

export const getCustomEmployeesAttendanceSummary= async(managerId, startDate, endDate) => {
  return await attendanceReportAx.get(`/manager/${managerId}/custom/?startDate=${startDate}&endDate=${endDate}`)
}

export const clockIn = async(employeeId) => {
  return await attendanceAx.post(`clock-in/${employeeId}`)
}

export const clockOut = async(employeeId) => {
  return await attendanceAx.post(`clock-out/${employeeId}`)
}

export const isClockedIn= async(employeeId) => {
  return await attendanceAx.get(`is-clocked-in/${employeeId}`);
}

export const isClockedOut= async(employeeId) => {
  return await attendanceAx.get(`is-clocked-out/${employeeId}`);
}

export const getAttendanceByEmployeeToday = async(employeeId) => {
  return await attendanceAx.get(`by-employee/${employeeId}/today`);
}

export const getLastAttendanceByEmployee = async(employeeId) => {
  return await attendanceAx.get(`last-attendance/${employeeId}`)
}