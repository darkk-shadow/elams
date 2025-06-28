import axios from "axios"

const employeeAx = axios.create({baseURL: "http://localhost:9191/api/employees"});

const shiftAx = axios.create({baseURL: "http://localhost:9191/api/shifts"});

export const addEmployee = async(employee) => {
  return await employeeAx.post(`add-employee`,employee);
}

export const addManager = async(manager) => {
  return await employeeAx.post(`add-manager`, manager);
}

export const getEmployeesByManager = async(managerId) => {
  return await employeeAx.get(`get-employees-by-manager/${managerId}`);
}

export const getShifts = async() => {
  return shiftAx.get(`all`);
}

export const assignShift = async(employeeId, shiftType) => {
  return employeeAx.put(`${employeeId}/assign-shift/?shiftType=${shiftType}`)
}

export const addEmployeeToTeam = async(managerId, employeeId) => {
  return employeeAx.put(`${employeeId}/assign-manager/${managerId}`)
}

export const getAvailableEmployees = async() => {
  return employeeAx.get(`get-available-employees`)
}

export const removeEmployeeFromTeam = async(managerId, employeeId) => {
   return employeeAx.put(`${managerId}/remove-employee-from-team/${employeeId}`)
}

export const getShiftReportByManager = async(managerId) => {
  return employeeAx.get(`get-shift-report-by-manager/${managerId}`);
}