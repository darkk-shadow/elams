import axios from "axios"

const baseUrl = "http://localhost:9090/api/employees"

export const getEmployeeName = () => {
  return axios.get(baseUrl)
    .then(r => console.log(r))
    .catch(e => console.error(e))
}