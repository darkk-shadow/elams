import { createContext, useContext, useEffect } from "react";
import { getAttendanceByManager } from "../services/attendanceService";
import { useAuth } from "./AuthProvider";
import useApi from "../util/useApi";

const ManagerAttendanceContext = createContext();

const ManagerAttendanceProvider = ({children}) => {

  const {user} = useAuth();

  const {
      data: managerAttendanceReport,
      loading: managerAttendanceLoading,
      error: managerAttendanceError,
      request: fetchAttendanceByManager
    } = useApi();

  useEffect(()=>{
    fetchAttendanceByManager(()=>getAttendanceByManager(user.id))
  },[])

  return(
    <ManagerAttendanceContext.Provider value={{
      managerAttendanceReport, managerAttendanceError,
      managerAttendanceLoading,
    }}>
      {children}
    </ManagerAttendanceContext.Provider>
  )
}

export const useManagerAttendanceProvider = () => {
  return useContext(ManagerAttendanceContext);
}

export default ManagerAttendanceProvider;