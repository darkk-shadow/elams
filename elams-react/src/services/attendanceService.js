import axios from "axios"
import API_BASE_URL from "./api";

const attendanceReportBaseURL = `${API_BASE_URL}/api/attendance-reports`;
const attendanceBaseURL = `${API_BASE_URL}/api/attendances`;

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export const getCustomEmployeesAttendanceSummary= async(managerId, startDate, endDate) => {
  return await axios.get(`${attendanceReportBaseURL}/manager/${managerId}/custom/?startDate=${startDate}&endDate=${endDate}`)
}

export const clockIn = async(employeeId) => {
  return await axios.post(`${attendanceBaseURL}/clock-in/${employeeId}`)
}

export const clockOut = async(employeeId) => {
  return await axios.post(`${attendanceBaseURL}/clock-out/${employeeId}`)
}

export const isClockedIn= async(employeeId) => {
  return await axios.get(`${attendanceBaseURL}/is-clocked-in/${employeeId}`);
}

export const isClockedOut= async(employeeId) => {
  return await axios.get(`${attendanceBaseURL}/is-clocked-out/${employeeId}`);
}

export const getAttendanceByEmployeeToday = async(employeeId) => {
  return await axios.get(`${attendanceBaseURL}/by-employee/${employeeId}/today`);
}

export const getLastAttendanceByEmployee = async(employeeId) => {
  return await axios.get(`${attendanceBaseURL}/last-attendance/${employeeId}`)
}

export const getAttendancesByEmployee = async(employeeId) => {
  return await axios.get(`${attendanceBaseURL}/by-employee/${employeeId}`)
}

export const getAttendanceByManager = async(managerId) => {
  return axios.get(`${attendanceBaseURL}/by-manager/${managerId}`)
}