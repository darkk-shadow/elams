import axios from "axios"

const baseUrl = "http://localhost:9191/api/employees"

export const addEmployee = async(employee) => {
  return axios.post(`${baseUrl}/add-employee`,employee);
}