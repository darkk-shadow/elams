import axios from "axios"

const leaveRequestAx = axios.create({baseURL: "http://localhost:9192/api/leave-requests"});
const leaveBalanceAx = axios.create({baseURL: "http://localhost:9192/api/leave-balances"})

export const getLeaveRequestsByManager = async(managerId)=>{
  return await leaveRequestAx.get(`/by-manager/${managerId}`);
}

export const getLeaveTypes = async() => {
  return await leaveBalanceAx.get(`get-leave-types`)
}

export const createLeaveRequest = async(request) => {
  return await leaveRequestAx.post("", request)
}

export const getLeaveBalanceByEmployee = async(employeeId) => {
  return await leaveBalanceAx.get(`/employee/${employeeId}`);
}