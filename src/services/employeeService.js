import axios from "axios"

const employeeAx = axios.create({baseURL: "http://localhost:9191/api/employees"});

const shiftAx = axios.create({baseURL: "http://localhost:9191/api/shifts"});

export const addEmployee = async(employee) => {
  return employeeAx.post(`add-employee`,employee);
}

export const getEmployeesByManager = async(managerId) => {
  return employeeAx.get(`get-employees-by-manager/${managerId}`);
}

export const getShifts = async() => {
  return shiftAx.get(`all`);
}

export const assignShift = async(employeeId, shiftType) => {
  return employeeAx.put(`${employeeId}/assign-shift/?shiftType=${shiftType}`)
}

export const addEmployeeToTeam = (managerId, employeeId) => {
  return employeeAx.put(`${employeeId}/assign-manager/${managerId}`)
}

export const getAvailableEmployees = () => {
  return employeeAx.get(`get-available-employees`)
}