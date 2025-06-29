import { createContext, Suspense, useContext, useEffect, useState } from "react";
import { useAuth } from './AuthProvider';
import { getLeaveRequestsByManager } from '../services/leaveService';

const ManagerLeaveContext = createContext();

const ManagerLeaveProvider = ({children}) => {
  const [leaveStatusDistribution, setLeaveStatusDistribution] = useState([]);
  const [leaveTypeDistribution, setLeaveTypeDistribution] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  const {user} = useAuth(); 

  useEffect(()=>{
    getLeaveRequestsByManager(user.id)
      .then(r => setLeaveRequests(r.data))
      .catch(e => console.error(e));
  },[])

  useEffect(()=>{
    let lsd={};
    leaveRequests.forEach(l => {
      if(lsd[l.status]) lsd[l.status]++
      else lsd[l.status]=1
    })

    let lsdData = [];
    for(let v in lsd){
      lsdData.push({
        label: v,
        value: lsd[v]
      })
    }
    setLeaveStatusDistribution(lsdData)

    let ltd={};
    leaveRequests.forEach(l => {
      if(ltd[l.leaveType]) ltd[l.leaveType]++
      else ltd[l.leaveType]=1
    })

    let ltdData = [];
    for(let v in ltd){
      ltdData.push({
        label: v,
        value: ltd[v]
      })
    }
    setLeaveTypeDistribution(ltdData)
  },[leaveRequests])

  return(
    <Suspense fallback={<p>loading</p>}>
    <ManagerLeaveContext.Provider value={{
      leaveStatusDistribution, setLeaveStatusDistribution,
      leaveTypeDistribution, setLeaveTypeDistribution,
      leaveRequests, setLeaveRequests
    }}>
      {children}
    </ManagerLeaveContext.Provider></Suspense>
  )
}

export const useManagerLeave = () => {
  return useContext(ManagerLeaveContext);
}

export default ManagerLeaveProvider;