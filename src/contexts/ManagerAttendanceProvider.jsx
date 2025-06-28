import { createContext } from "react";

const ManagerAttendanceContext = createContext();

const ManagerAttendanceProvider = ({children}) => {

  

  return(
    <ManagerAttendanceContext.Provider value={{}}>
      {children}
    </ManagerAttendanceContext.Provider>
  )
}