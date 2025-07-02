import axios from "axios"

const leaveRequestBaseURL = "http://localhost:9090/api/leave-requests";
const leaveBalanceBaseURL = "http://localhost:9090/api/leave-balances";


axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export const getLeaveRequestsByManager = (managerId)=>{
  return  axios.get(`${leaveRequestBaseURL}/by-manager/${managerId}`);
}

export const getLeaveTypes = () => {
  return  leaveBalanceAx.get(`${leaveRequestBaseURL}/get-leave-types`)
}

export const createLeaveRequest = (request) => {
  return  axios.post(leaveRequestBaseURL, request)
}

export const getLeaveBalanceByEmployee = (employeeId) => {
  return  leaveBalanceAx.get(`${leaveRequestBaseURL}/employee/${employeeId}`);
}

export const getLeaveRequestByEmployee = (employeeId) => {
  return  axios.get(`${leaveRequestBaseURL}/by-employee?employeeId=${employeeId}`)
}

export const getAllocatedLeaves =  (employeeId) => {
  return  leaveBalanceAx.get(`${leaveRequestBaseURL}/get-allocated-leaves`)
}