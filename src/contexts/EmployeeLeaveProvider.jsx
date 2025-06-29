import { createContext, useContext, useEffect, useState } from "react";
import { getLeaveBalanceByEmployee, getLeaveRequestByEmployee, getLeaveTypes } from "../services/leaveService";
import { useAuth } from "./AuthProvider";

const EmployeeLeaveContext = createContext()

const EmployeeLeaveProvider = ({children}) => {

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([])

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

  return(
    <EmployeeLeaveContext.Provider value={{
      leaveTypes, setLeaveTypes,
      leaveBalances, setLeaveBalances,
      leaveRequests, setLeaveRequests
    }}>
      {children}
    </EmployeeLeaveContext.Provider>
  )
}

export const useEmployeeLeave = () => {
  return useContext(EmployeeLeaveContext);
}

export default EmployeeLeaveProvider;