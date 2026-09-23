import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { getEmployeeById, getEmployeesByManager } from "../services/employeeService";

const ManagerContext = createContext();

const ManagerProvider = ({children}) => {

  const {user} = useAuth();

  const [teamMembers, setTeamMembers] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [teamCount, setTeamCount] = useState(0)

  useEffect(()=>{
    if(!user) return;
      getEmployeeById(user.id)
        .then(r=>setEmployee(r.data))
        .catch(e => console.error(e));
  },[user])

  useEffect(()=>{
    if(!employee) return;
    getEmployeesByManager(user.id)
      .then(r => {
        setTeamMembers(r.data);
        setTeamCount(r.data.length);
      })
      .catch(e => console.error(e))
  },[employee])

  return(
    <ManagerContext.Provider value={{
      teamMembers, setTeamMembers,
      employee, setEmployee,
      teamCount, setTeamCount
    }}>
      {children}
    </ManagerContext.Provider>
  )
}

export const useManager = () => {
  return useContext(ManagerContext);
}

export default ManagerProvider;