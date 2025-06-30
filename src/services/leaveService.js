import axios from "axios"

const leaveRequestAx = axios.create({baseURL: "http://localhost:9090/api/leave-requests"});
const leaveBalanceAx = axios.create({baseURL: "http://localhost:9090/api/leave-balances"})

export const getLeaveRequestsByManager = (managerId)=>{
  return  leaveRequestAx.get(`/by-manager/${managerId}`);
}

export const getLeaveTypes = () => {
  return  leaveBalanceAx.get(`get-leave-types`)
}

export const createLeaveRequest = (request) => {
  return  leaveRequestAx.post("", request)
}

export const getLeaveBalanceByEmployee = (employeeId) => {
  return  leaveBalanceAx.get(`/employee/${employeeId}`);
}

export const getLeaveRequestByEmployee = (employeeId) => {
  return  leaveRequestAx.get(`by-employee?employeeId=${employeeId}`)
}

export const getAllocatedLeaves =  (employeeId) => {
  return  leaveBalanceAx.get(`get-allocated-leaves`)
}