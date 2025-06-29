import { createContext, useContext, useEffect, useState } from "react";
import { getAttendancesByEmployee } from "../services/attendanceService";
import { useAuth } from "./AuthProvider";

const EmployeeAttendanceContext = createContext();

const EmployeeAttendanceProvider = ({children}) => {

  const {user} = useAuth();

  const [attendances, setAttendances] = useState([]);

  useEffect(()=>{
    getAttendancesByEmployee(user.id)
      .then(r => setAttendances(r.data))
      .catch(e => console.error(e));
  },[])

  return (
    <EmployeeAttendanceContext.Provider value={{
      attendances, setAttendances
    }}>
      {children}
    </EmployeeAttendanceContext.Provider>
  )
}

export const useEmployeeAttendance = () => {
  return useContext(EmployeeAttendanceContext);
}

export default EmployeeAttendanceProvider;