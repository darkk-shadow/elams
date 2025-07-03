import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { getAvailableEmployees, getEmployeesByManager, getShifts } from "../services/employeeService";

const ManagerEmployeeContext = createContext();

const ManagerEmployeeProvider = ({children}) => {

  const {user} = useAuth();
  
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  
  const fetchData = () => {
    console.log("im gettin g called")
    getEmployeesByManager(user.id)
      .then((r) => setEmployees(r.data))
      .catch((e) => console.error(e));

    getAvailableEmployees()
      .then((r) => setAvailableEmployees(r.data))
      .catch(e => console.error(e));

    getShifts()
      .then((r) => setShifts(r.data))
      .catch(e => console.error(e));
    
  }
  

  return <ManagerEmployeeContext.Provider value={{
    availableEmployees, setAvailableEmployees,
    employees, setEmployees,
    shifts, setShifts, fetchData

  }}>
    {children}
  </ManagerEmployeeContext.Provider>
}

export const useManagerEmployees = () => {
  return useContext(ManagerEmployeeContext);
}

export default ManagerEmployeeProvider;