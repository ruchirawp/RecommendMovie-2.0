import axios from 'axios'
import { baseUrl } from "../../services/baseValues";
// const baseUrl = '/login'

const login = async credentials => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

export default {login}


