import apiClient from "./api";

const leaveRequestBaseURL = `/api/leave-requests`;
const leaveBalanceBaseURL = `/api/leave-balances`;

export const getLeaveRequestsByManager = (managerId) => {
  return apiClient.get(`${leaveRequestBaseURL}/by-manager/${managerId}`);
};

export const getLeaveTypes = () => {
  return apiClient.get(`${leaveBalanceBaseURL}/get-leave-types`);
};

export const createLeaveRequest = (request) => {
  return apiClient.post(leaveRequestBaseURL, request);
};

export const getLeaveBalanceByEmployee = (employeeId) => {
  return apiClient.get(`${leaveBalanceBaseURL}/employee/${employeeId}`);
};

export const getLeaveRequestByEmployee = (employeeId) => {
  return apiClient.get(`${leaveRequestBaseURL}/by-employee?employeeId=${employeeId}`);
};

export const getAllocatedLeaves = () => {
  return apiClient.get(`${leaveBalanceBaseURL}/get-allocated-leaves`);
};