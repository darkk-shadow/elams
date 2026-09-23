import axios from "axios"
import API_BASE_URL from "./api";

const employeeBaseURL = `${API_BASE_URL}/api/employees`;

const shiftBaseURL = `${API_BASE_URL}/api/shifts`;

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export const addEmployee = async(employee) => {
  return await axios.post(`${employeeBaseURL}/add-employee`,employee);
}

export const addManager = async(manager) => {
  return await axios.post(`${employeeBaseURL}/add-manager`, manager);
}

export const getEmployeesByManager = async(managerId) => {
  return await axios.get(`${employeeBaseURL}/get-employees-by-manager/${managerId}`);
}

export const getShifts = async() => {
  return axios.get(`${shiftBaseURL}/all`);
}

export const getShiftById = async(id) => {
  return axios.get(`${shiftBaseURL}/${id}`)
}

export const assignShift = async(employeeId, shiftType) => {
  return axios.put(`${employeeBaseURL}/${employeeId}/assign-shift/?shiftType=${shiftType}`)
}

export const addEmployeeToTeam = async(managerId, employeeId) => {
  return axios.put(`${employeeBaseURL}/${employeeId}/assign-manager/${managerId}`)
}

export const getAvailableEmployees = async() => {
  return axios.get(`${employeeBaseURL}/get-available-employees`)
}

export const removeEmployeeFromTeam = async(managerId, employeeId) => {
   return axios.put(`${employeeBaseURL}/${managerId}/remove-employee-from-team/${employeeId}`)
}

export const getShiftReportByManager = async(managerId) => {
  return axios.get(`${employeeBaseURL}/get-shift-report-by-manager/${managerId}`);
}

export const getTeamMembetsCount = async(managerId) => {
  return axios.get(`${employeeBaseURL}/${managerId}/get-team-members-count`);
}

export const getEmployeeById = async(employeeId) => {
  return axios.get(`${employeeBaseURL}/${employeeId}`);
}

export const deleteEmployeeById = async(employeeId) => {
  return axios.delete(`${employeeBaseURL}/${employeeId}/delete`)
}