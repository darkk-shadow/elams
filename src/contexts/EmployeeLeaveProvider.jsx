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
  const [leaveStatusDistribution, setLeaveStatusDistribution] = useState([]);
  const [leaveTypeDistribution, setLeaveTypeDistribution] = useState([]);

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
      if(!allocatedLeaves || !leaveBalances || !leaveStatusDistribution) return;
      if(allocatedLeaves.length <1 && leaveBalances.length < 1) return;
      const totalBalance = leaveBalances.reduce((a, b)=>a+b.balance,0)
      const allLvs =  allocatedLeaves.reduce((a, b)=>a+b.balance,0)
      const usedLeave = allLvs - totalBalance

      let approvedLeave = leaveStatusDistribution?.find(l=>l.label=="APPROVED")?.value;
      approvedLeave = approvedLeave ? approvedLeave : 0;

      let rejectLeave = leaveStatusDistribution?.find(l=>l.label=="REJECTED")?.value;
      rejectLeave = rejectLeave ? rejectLeave : 0;

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
          value: rejectLeave,
          icon: CancelIcon,
          color: "red"
        },
        // {
        //   label: "More",
        //   value: "...",
        //   icon: MoreHorizIcon,
        //   color: "gray"
        // }
      ])
    },[allocatedLeaves, leaveBalances, leaveStatusDistribution, leaveTypeDistribution])

    useEffect(()=>{
      let lsd={};
      leaveRequests.forEach(l => {
        if(lsd[l.status]) lsd[l.status]++
        else lsd[l.status]=1
      })
  
      let lsdData = [];
      for(let v in lsd){
        lsdData.push({
          label: v,
          value: lsd[v]
        })
      }
      setLeaveStatusDistribution(lsdData)
  
      let ltd={};
      leaveRequests.forEach(l => {
        if(ltd[l.leaveType]) ltd[l.leaveType]++
        else ltd[l.leaveType]=1
      })
  
      let ltdData = [];
      for(let v in ltd){
        ltdData.push({
          label: v,
          value: ltd[v]
        })
      }
      setLeaveTypeDistribution(ltdData)
    },[leaveRequests])

  return(
    <EmployeeLeaveContext.Provider value={{
      leaveTypes, setLeaveTypes,
      leaveBalances, setLeaveBalances,
      leaveRequests, setLeaveRequests,
      allocatedLeaves, setAllocatedLeaves,
      leaveData, setLeaveData,
      leaveStatusDistribution, setLeaveStatusDistribution,
      leaveTypeDistribution, setLeaveTypeDistribution
    }}>
        {children}
    </EmployeeLeaveContext.Provider>
  )
}

export const useEmployeeLeave = () => {
  return useContext(EmployeeLeaveContext);
}

export default EmployeeLeaveProvider;