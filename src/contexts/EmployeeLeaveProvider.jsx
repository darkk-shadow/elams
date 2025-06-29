import { createContext, Suspense, useContext, useEffect, useState } from "react";
import { getAllocatedLeaves, getLeaveBalanceByEmployee, getLeaveRequestByEmployee, getLeaveTypes } from "../services/leaveService";
import { useAuth } from "./AuthProvider";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const EmployeeLeaveContext = createContext()

const EmployeeLeaveProvider = ({children}) => {

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([])
  const [allocatedLeaves, setAllocatedLeaves] = useState([])
  const [leaveData, setLeaveData] = useState([]);

  const {user} = useAuth();

  useEffect(()=>{
    getLeaveTypes()
      .then(r => setLeaveTypes(r.data))
      .catch(e => console.log(e))
  },[])

  useEffect(()=>{
    getLeaveBalanceByEmployee(user.id)
      .then(r => setLeaveBalances(r.data))
      .catch(e => console.error(e));
  },[])

  useEffect(()=>{
    getLeaveRequestByEmployee(user.id)
      .then(r => setLeaveRequests(r.data))
      .catch(e => console.error(e))
  },[])

  useEffect(()=>{
    getAllocatedLeaves()
      .then(r => setAllocatedLeaves(r.data))
      .catch(e => console.log(e))
  },[])

  useEffect(()=>{
      if(!allocatedLeaves || !leaveBalances) return;
      if(allocatedLeaves.length <1 && leaveBalances.length < 1) return;
      const totalBalance = leaveBalances.reduce((a, b)=>a+b.balance,0)
      const allLvs =  allocatedLeaves.reduce((a, b)=>a+b.balance,0)
      const usedLeave = allLvs - totalBalance
      const approvedLeave = usedLeave / 2;
      const rejectedLeave = usedLeave - approvedLeave;
  
      setLeaveData([
        {
          label: "Total Balance",
          value: totalBalance,
          icon: EventAvailableIcon,
          color: "blue"
        },
        {
          label: "Used Leaves",
          value: usedLeave,
          icon: HistoryIcon,
          color: "orange"
        },
        {
          label: "Approved Leaves",
          value: approvedLeave,
          icon: CheckCircleIcon,
          color: "green"
        },
        {
          label: "Rejected Leaves",
          value: rejectedLeave,
          icon: CancelIcon,
          color: "red"
        },
        {
          label: "More",
          value: "...",
          icon: MoreHorizIcon,
          color: "gray"
        }
      ])
    },[allocatedLeaves, leaveBalances])

  return(
    <EmployeeLeaveContext.Provider value={{
      leaveTypes, setLeaveTypes,
      leaveBalances, setLeaveBalances,
      leaveRequests, setLeaveRequests,
      allocatedLeaves, setAllocatedLeaves,
      leaveData, setLeaveData,
    }}>
        {children}
    </EmployeeLeaveContext.Provider>
  )
}

export const useEmployeeLeave = () => {
  return useContext(EmployeeLeaveContext);
}

export default EmployeeLeaveProvider;