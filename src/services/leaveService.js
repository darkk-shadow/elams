import axios from "axios"

const leaveRequestAx = axios.create({baseURL: "http://localhost:9090/api/leave-requests"});

export const getLeaveRequestsByManager = managerId=>{
  return leaveRequestAx.get(`/by-manager/${managerId}`);
}