import { createContext, Suspense, useContext, useEffect, useState } from "react";
import { getAllocatedLeaves, getLeaveBalanceByEmployee, getLeaveRequestByEmployee, getLeaveTypes } from "../services/leaveService";
import { useAuth } from "./AuthProvider";

const EmployeeLeaveContext = createContext()

const EmployeeLeaveProvider = ({children}) => {

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([])
  const [allocatedLeaves, setAllocatedLeaves] = useState([])

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

  return(
    <EmployeeLeaveContext.Provider value={{
      leaveTypes, setLeaveTypes,
      leaveBalances, setLeaveBalances,
      leaveRequests, setLeaveRequests,
      allocatedLeaves, setAllocatedLeaves
    }}>
      <Suspense fallback={<div>hey </div>}>
        {children}
      </Suspense>
    </EmployeeLeaveContext.Provider>
  )
}

export const useEmployeeLeave = () => {
  return useContext(EmployeeLeaveContext);
}

export default EmployeeLeaveProvider;