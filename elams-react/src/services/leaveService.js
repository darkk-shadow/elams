import axios from "axios"
import jwtHeader from "../util/jwtHeader";

const leaveRequestBaseURL = "http://localhost:9090/api/leave-requests";
const leaveBalanceBaseURL = "http://localhost:9090/api/leave-balances";

export const getLeaveRequestsByManager = (managerId)=>{
  return  axios.get(`${leaveRequestBaseURL}/by-manager/${managerId}`, jwtHeader);
}

export const getLeaveTypes = () => {
  return  axios.get(`${leaveBalanceBaseURL}/get-leave-types`, jwtHeader)
}

export const createLeaveRequest = (request) => {
  return  axios.post(leaveRequestBaseURL, request, jwtHeader)
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