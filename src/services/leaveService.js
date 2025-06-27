import axios from "axios"

const leaveRequestAx = axios.create({baseURL: "http://localhost:9192/api/leave-requests"});

export const getLeaveRequestsBtManager = managerId=>{
  return leaveRequestAx.get(`/by-manager/${managerId}`);
}