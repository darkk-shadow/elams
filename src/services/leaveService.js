import axios from "axios"

const leaveRequestAx = axios.create({baseURL: "http://localhost:9192/api/leave-requests"});

export const getLeaveRequestsByManager = async(managerId)=>{
  return await leaveRequestAx.get(`/by-manager/${managerId}`);
}