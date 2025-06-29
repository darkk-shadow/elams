import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { getEmployeeById, getShiftById } from "../services/employeeService";

const EmployeeContext = createContext();

const EmployeeProvier = ({children}) => {

  const {user} = useAuth();

  const [manager, setManager] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [shift, setShift] = useState("");

  useEffect(()=>{
    if(!user) return;
      getEmployeeById(user.id)
        .then(r=>setEmployee(r.data))
        .catch(e => console.error(e));
  },[user])

  useEffect(()=>{
    if(!employee) return;
    console.log(employee)
    getEmployeeById(employee.managerId)
      .then(r=>setManager(r.data))
      .catch(e => console.error(e))

    getShiftById(employee.shiftId)
      .then(r => setShift(r.data))
      .catch(e => console.error(e));
  },[employee])

  return(
    <EmployeeContext.Provider value={{
      manager, setManager,
      shift, setShift,
      employee, setEmployee,
    }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployee = () => {
  return useContext(EmployeeContext);
}

export default EmployeeProvier;