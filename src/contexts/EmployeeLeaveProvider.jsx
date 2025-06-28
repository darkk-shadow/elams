import { createContext, useContext, useEffect, useState } from "react";
import { getLeaveTypes } from "../services/leaveService";

const EmployeeLeaveContext = createContext()

const EmployeeLeaveProvider = ({children}) => {

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState([]);

  useEffect(()=>{
    getLeaveTypes()
      .then(r => setLeaveTypes(r.data))
      .catch(e => console.log(e))
  },[])

  return(
    <EmployeeLeaveContext.Provider value={{
      leaveTypes, setLeaveTypes,
      leaveBalances, setLeaveBalances,
    }}>
      {children}
    </EmployeeLeaveContext.Provider>
  )
}

export const useEmployeeLeave = () => {
  return useContext(EmployeeLeaveContext);
}

export default EmployeeLeaveProvider;