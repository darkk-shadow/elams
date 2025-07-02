import axios from "axios"

const leaveRequestBaseURL = "http://localhost:9090/api/leave-requests";
const leaveBalanceBaseURL = "http://localhost:9090/api/leave-balances";


axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export const getLeaveRequestsByManager = (managerId)=>{
  return  axios.get(`${leaveRequestBaseURL}/by-manager/${managerId}`);
}

export const getLeaveTypes = () => {
  return  axios.get(`${leaveBalanceBaseURL}/get-leave-types`)
}

export const createLeaveRequest = (request) => {
  return  axios.post(leaveRequestBaseURL, request)
}

export const getLeaveBalanceByEmployee = (employeeId) => {
  return  axios.get(`${leaveBalanceBaseURL}/employee/${employeeId}`);
}

export const getLeaveRequestByEmployee = (employeeId) => {
  return  axios.get(`${leaveRequestBaseURL}/by-employee?employeeId=${employeeId}`)
}

export const getAllocatedLeaves =  (employeeId) => {
  return  axios.get(`${leaveBalanceBaseURL}/get-allocated-leaves`)
}