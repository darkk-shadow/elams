import { createContext, useContext, useEffect, useState } from "react";
import { getAttendancesByEmployee } from "../services/attendanceService";
import { useAuth } from "./AuthProvider";
import generateAllAttendanceReports from "../util/generateAllAttendanceReports";

const EmployeeAttendanceContext = createContext();

const EmployeeAttendanceProvider = ({children}) => {

  const {user} = useAuth();

  const [attendances, setAttendances] = useState([]);
  const [attendanceReport, setAttendanceReport] = useState(null);

  useEffect(()=>{
    getAttendancesByEmployee(user.id)
      .then(r => setAttendances(r.data))
      .catch(e => console.error(e));
  },[])

  useEffect(()=>{
    const report = generateAllAttendanceReports(attendances);
    console.log(attendances)
    setAttendanceReport(report)
  }, [attendances])

  return (
    <EmployeeAttendanceContext.Provider value={{
      attendances, setAttendances,
      attendanceReport, setAttendanceReport
    }}>
      {children}
    </EmployeeAttendanceContext.Provider>
  )
}

export const useEmployeeAttendance = () => {
  return useContext(EmployeeAttendanceContext);
}

export default EmployeeAttendanceProvider;