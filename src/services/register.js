import axios from 'axios'
import { baseUrl } from "./baseValues";

// const baseUrl = '/register'

const register = async credentials => {
  const response = await axios.post(`${baseUrl}/register`, credentials)
  return response.data
}
export default {register}


