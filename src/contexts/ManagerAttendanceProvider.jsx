import { createContext, useContext, useEffect, useState } from "react";
import { getAttendanceByManager, getCustomEmployeesAttendanceSummary } from "../services/attendanceService";
import { useAuth } from "./AuthProvider";
import useApi from "../util/useApi";
import { useManagerLeave } from "./ManagerLeaveProvider";
import { getTeamMembetsCount } from '../services/employeeService'


const ManagerAttendanceContext = createContext();

const ManagerAttendanceProvider = ({children}) => {

  const {user} = useAuth();

  const {leaveStatusDistribution, leaveRequests} = useManagerLeave();

  const {
    data: managerAttendanceReport,
    loading: managerAttendanceLoading,
    error: managerAttendanceError,
    request: fetchAttendanceByManager
  } = useApi();

  const [noTappedIn, setNoTappedIn] = useState(0);
  const [noPendingLeave, setNoPendingLeave] = useState(0);
  const [teamMembersCount, setTeamMembersCount] = useState(0);
  const [onLeave, setOnLeaveCount] = useState(0);

  const [attendanceSummaryValues, setAttendanceSummaryValues] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState([]);
  const [attedanceGraphloading, setAttedanceGraphloading] = useState(true);

  useEffect(()=>{
    let date = new Date();
    let toDate = date.toLocaleString("sv").split(" ")[0];
    date.setDate(date.getDate()-10);
    let fromDate = date.toLocaleString("sv").split(" ")[0]
    setAttedanceGraphloading(true);
    getCustomEmployeesAttendanceSummary(user.id, fromDate, toDate)
      .then(r => {
        setAttendanceSummary(r.data)
        let d = r.data.map(report => {
          if (teamMembersCount == 0) return 0;
          return (report.totalPresents/teamMembersCount)*100
      })
      setAttendanceSummaryValues(d);
      setAttedanceGraphloading(false);
  }).catch(e => console.log(e));
  },[teamMembersCount])

  useEffect(()=>{
    let date = new Date();
    let fDate = date.toLocaleString("sv").split(" ")[0]

    getCustomEmployeesAttendanceSummary(user.id, fDate, fDate)
      .then(r=>{
        console.log(r.data)
        setNoTappedIn(r.data[0].totalPresents)
      })
      .catch(e=>console.error(e))

    console.log(leaveStatusDistribution)
  },[])

  useEffect(()=>{
    getTeamMembetsCount(user.id)
      .then(r => setTeamMembersCount(r.data))
      .catch(e => console.error(e));
  },[])

  useEffect(()=>{
    let val = leaveStatusDistribution.find(l=>l.label=="PENDING")?.value
    val = val ? val : 0
    setNoPendingLeave(
      val
    )
  },[leaveStatusDistribution])

  useEffect(()=>{
    let today = new Date()
    today.setHours(0, 0, 0, 0);
    let todayAbsentees = leaveRequests
        .filter(l => {
          const start = new Date(l.startDate);
          const end = new Date(l.endDate);
          start.setHours(0, 0, 0, 0);
          end.setHours(0, 0, 0, 0); 
          return start <= today && end >= today;
        })
        .filter(l => l.status == "APPROVED")
      setOnLeaveCount(todayAbsentees.length);
  },[leaveRequests])

  useEffect(()=>{
    fetchAttendanceByManager(()=>getAttendanceByManager(user.id))
  },[])

  return(
    <ManagerAttendanceContext.Provider value={{
      managerAttendanceReport, managerAttendanceError,
      managerAttendanceLoading,
      noTappedIn, setNoTappedIn,
      noPendingLeave, setNoPendingLeave,
      teamMembersCount, setTeamMembersCount,
      onLeave, setOnLeaveCount,
      attendanceSummaryValues, setAttendanceSummaryValues,
      attedanceGraphloading, setAttedanceGraphloading,
      attendanceSummary, setAttendanceSummary
    }}>
      {children}
    </ManagerAttendanceContext.Provider>
  )
}

export const useManagerAttendance = () => {
  return useContext(ManagerAttendanceContext);
}

export default ManagerAttendanceProvider;