import apiClient from "./api";

const employeeBaseURL = `/api/employees`;
const shiftBaseURL = `/api/shifts`;

export const addEmployee = async (employee) => {
  return await apiClient.post(`${employeeBaseURL}/add-employee`, employee);
};

export const addManager = async (manager) => {
  return await apiClient.post(`${employeeBaseURL}/add-manager`, manager);
};

export const getEmployeesByManager = async (managerId) => {
  return await apiClient.get(`${employeeBaseURL}/get-employees-by-manager/${managerId}`);
};

export const getShifts = async () => {
  return apiClient.get(`${shiftBaseURL}/all`);
};

export const getShiftById = async (id) => {
  return apiClient.get(`${shiftBaseURL}/${id}`);
};

export const assignShift = async (employeeId, shiftType) => {
  return apiClient.put(`${employeeBaseURL}/${employeeId}/assign-shift/?shiftType=${shiftType}`);
};

export const addEmployeeToTeam = async (managerId, employeeId) => {
  return apiClient.put(`${employeeBaseURL}/${employeeId}/assign-manager/${managerId}`);
};

export const getAvailableEmployees = async () => {
  return apiClient.get(`${employeeBaseURL}/get-available-employees`);
};

export const removeEmployeeFromTeam = async (managerId, employeeId) => {
  return apiClient.put(`${employeeBaseURL}/${managerId}/remove-employee-from-team/${employeeId}`);
};

export const getShiftReportByManager = async (managerId) => {
  return apiClient.get(`${employeeBaseURL}/get-shift-report-by-manager/${managerId}`);
};

export const getTeamMembetsCount = async (managerId) => {
  return apiClient.get(`${employeeBaseURL}/${managerId}/get-team-members-count`);
};

export const getEmployeeById = async (employeeId) => {
  return apiClient.get(`${employeeBaseURL}/${employeeId}`);
};

export const deleteEmployeeById = async (employeeId) => {
  return apiClient.delete(`${employeeBaseURL}/${employeeId}/delete`);
};